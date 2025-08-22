import { NextResponse } from "next/server";

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
  hp?: string; // honeypot field
  startedAt?: number; // client timestamp when form opened
};

// Simple in-memory per-IP rate limiter (best-effort in serverless)
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // 5 messages per 10 minutes per IP
type RateState = { count: number; windowStart: number };
// Persist across hot reloads (Node runtime) using globalThis
const globalAny = globalThis as unknown as { __contactRate__: Map<string, RateState> };
if (!globalAny.__contactRate__) globalAny.__contactRate__ = new Map<string, RateState>();
const rateStore = globalAny.__contactRate__;

function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const cur = rateStore.get(ip);
  if (!cur || now - cur.windowStart > WINDOW_MS) {
    rateStore.set(ip, { count: 1, windowStart: now });
    return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }
  if (cur.count >= MAX_REQUESTS_PER_WINDOW) {
    return { limited: true, remaining: 0 };
  }
  cur.count += 1;
  rateStore.set(ip, cur);
  return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - cur.count };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const { name, email, message, hp, startedAt } = (await request.json()) as ContactRequestBody;

    // Honeypot: real users won't fill this hidden field
    if (hp && hp.trim().length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Per-IP rate limiting
    const ip = getClientIp(request);
    const rl = isRateLimited(ip);
    if (rl.limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message is too short" },
        { status: 400 }
      );
    }

    // Time-on-form check to reduce bot submissions
    if (!startedAt || Date.now() - Number(startedAt) < 3000) {
      return NextResponse.json(
        { error: "Form submitted too quickly" },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Missing Supabase configuration on server" },
        { status: 500 }
      );
    }

    const targetUrl = `${supabaseUrl}/functions/v1/contact-email`;
    const upstreamResponse = await fetch(
      targetUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ name, email, message }),
      }
    );

    const responseText = await upstreamResponse.text();
    let responseJson: unknown;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      responseJson = { raw: responseText } as { raw: string };
    }

    if (!upstreamResponse.ok) {
      let friendly = "Failed to send message";
      if (upstreamResponse.status === 404) {
        friendly =
          `Supabase function 'contact-email' not found at ${targetUrl}. Verify your SUPABASE URL points to the project where the function is deployed.`;
      } else if (upstreamResponse.status === 401 || upstreamResponse.status === 403) {
        friendly =
          "Unauthorized calling Supabase function. Check NEXT_PUBLIC_SUPABASE_ANON_KEY and function JWT settings.";
      } else if (hasError(responseJson)) {
        const err = responseJson.error;
        friendly = typeof err === "string" ? err : JSON.stringify(err);
      }

      // Log full upstream response for server debugging
      console.error("/api/contact upstream error", {
        status: upstreamResponse.status,
        targetUrl,
        responseJson,
      });

      return NextResponse.json(
        { error: friendly, status: upstreamResponse.status },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json(responseJson, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function hasError(value: unknown): value is { error: unknown } {
  return typeof value === "object" && value !== null && "error" in (value as Record<string, unknown>);
}


