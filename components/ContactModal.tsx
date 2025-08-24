"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formStart?: number | null;
}

/**
 * Contact modal for project inquiries
 */
export function ContactModal({ isOpen, onClose, formStart }: ContactModalProps) {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const loadingId = toast.loading("Sending your message...");
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMessage,
          hp: (document.querySelector('input[name="company"]') as HTMLInputElement | null)?.value || "",
          startedAt: formStart || Date.now(),
        }),
      });
      
      if (!res.ok) {
        const errorJson: unknown = await res.json().catch(() => ({} as unknown));
        toast.dismiss(loadingId);
        const msg = extractErrorMessage(errorJson);
        throw new Error(msg || "Failed to send message");
      }
      
      toast.dismiss();
      toast.success("Message sent! I&apos;ll get back to you within 24 hours.");
      onClose();
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    } catch (err) {
      toast.error(
        `Unable to send message. ${err instanceof Error ? err.message : "Please try again later."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  function extractErrorMessage(value: unknown): string | undefined {
    if (
      typeof value === "object" &&
      value !== null &&
      "error" in (value as Record<string, unknown>)
    ) {
      const err = (value as Record<string, unknown>).error;
      if (typeof err === "string") return err;
      try {
        return JSON.stringify(err);
      } catch {
        return undefined;
      }
    }
    return undefined;
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl border p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          aria-label="Close"
          className="absolute right-4 top-4 text-black/60 hover:text-black transition-colors"
          onClick={onClose}
        >
          ✕
        </button>
        
        {/* Modal Header */}
        <h3 className="text-xl md:text-2xl font-semibold">Work With Me</h3>
        <p className="mt-1 text-sm text-black/60">
          Send me a quick message and I&apos;ll reply by email.
        </p>
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black/80">
              Your Name
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7900]/50 transition-all"
              placeholder="Juan Dela Cruz"
              required
            />
          </div>
          
          {/* Honeypot field - hidden from real users */}
          <div className="hidden" aria-hidden="true">
            <label>Leave this field empty</label>
            <input type="text" name="company" autoComplete="off" tabIndex={-1} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black/80">
              Your Email
            </label>
            <input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7900]/50 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black/80">
              Message
            </label>
            <textarea
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 min-h-28 outline-none focus:ring-2 focus:ring-[#FF7900]/50 transition-all"
              placeholder="Briefly describe your project goals, timeline, and budget."
              required
            />
          </div>
          
          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center rounded-full border px-5 py-2 text-sm font-medium hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center rounded-full bg-[#FF7900] px-6 py-2 text-sm font-medium shadow-sm hover:bg-[#e66d00] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
          
          <p className="text-[11px] text-black/50">
            Your message is securely sent via Supabase.
          </p>
        </form>
      </div>
    </div>
  );
}
