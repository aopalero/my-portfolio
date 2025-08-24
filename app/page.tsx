"use client";
import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";

import { toast } from "sonner";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStart, setFormStart] = useState<number | null>(null);

  const closeContactModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Optional: compose additional metadata for future use

    // Send via Next.js API route (proxies to Supabase Edge Function)
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
      toast.success("Message sent! I’ll get back to you within 24 hours.");
      setIsModalOpen(false);
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContactModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[.08] shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center text-2xl font-bold tracking-tight hover:scale-105 transition-transform">
            <span className="text-[#FF7900]">ao</span>
            <span className="text-black">palero</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-black/70">
            <a href="#home" className="hover:text-[#FF7900] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#FF7900] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#FF7900] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#FF7900] transition-colors">Skills</a>
            <a href="#contact" className="hover:text-[#FF7900] transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setFormStart(Date.now()); }}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF7900] px-6 py-2.5 text-white text-sm font-semibold shadow-lg hover:bg-[#e66d00] hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Work With Me
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="w-full scroll-mt-24 md:scroll-mt-28">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="w-full max-w-2xl mx-auto text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7900]/10 text-[#FF7900] text-sm font-semibold mb-6">
              Full-stack Web Developer
            </div>
            <h1 className="text-4xl md:text-6xl md:w-[600px] font-bold tracking-tight leading-[1.1]">
              I Build <span className="text-[#FF7900] relative">
                Scalable
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#FF7900] to-[#e66d00] rounded-full"></div>
              </span> Web
              Applications That
              <br className="hidden md:block" />
              <span className="text-[#FF7900] relative"> Solve
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#FF7900] to-[#e66d00] rounded-full"></div>
              </span> Real Problems.
            </h1>
            <p className="mt-6 text-lg text-black/70 max-w-xl leading-relaxed">
              From schools and organizations to businesses and personal projects, I
              deliver end-to-end solutions — frontend, backend, and everything in
              between. No need to hire multiple developers. With me, you get it
              all.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setFormStart(Date.now()); }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7900] px-8 py-4 text-white font-semibold shadow-lg transition-all duration-200 hover:bg-[#e66d00] hover:shadow-xl hover:scale-105"
              >
                Let&rsquo;s Build Together
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FF7900] text-[#FF7900] px-8 py-4 font-semibold hover:bg-[#FF7900] hover:text-white transition-all duration-200 hover:scale-105"
              >
                View My Projects
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            </div>
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 opacity-80">
              <Image src="/assets/zap.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-16 md:h-16" />
              <Image src="/assets/tesda.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-16 md:h-16" />
              <Image src="/assets/bpc.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-16 md:h-16" />
              <Image src="/assets/dswd.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-16 md:h-16" />
            </div>
          </div>

           <div className="relative rounded-3xl overflow-hidden rounded-full w-[320px] h-[400px] md:w-[420px] md:h-[600px] place-self-center md:place-self-end shadow-2xl bg-gradient-to-br from-[#FF7900] to-[#e66d00] order-1 md:order-2 hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <Image
                src="/assets/me.png"
                alt="Abel Palero - Full-stack Web Developer"
                fill
                className="object-cover z-0"
                priority
              />
            </div>
        </div>
      </section>

      {/* USP */}
      <section className="bg-gradient-to-br from-[#ffe9d6] to-[#fff5ee] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 80% 20%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 40% 80%, rgba(255, 121, 0, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 text-[#FF7900] text-sm font-semibold mb-6">
            Why Choose One Expert Over Many?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Why Struggle With Multiple Developers<br />
            <span className="text-[#FF7900]">When One Expert Can Handle It All?</span>
          </h2>
          <p className="mt-6 text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            Hiring separate frontend and backend developers is expensive, time-consuming, and frustrating.
            I handle your project end-to-end — from UI design to database architecture.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-8 text-left">
            {[
              {
                title: "End-to-End Development",
                desc: "One developer, complete solution.",
                icon: (
                  <svg className="w-6 h-6 text-[#FF7900]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                title: "Adaptable Experience", 
                desc: "From government to schools to personal projects.",
                icon: (
                  <svg className="w-6 h-6 text-[#FF7900]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                title: "Modern Tech Stack",
                desc: "Next.js, Vue.js, Laravel, Supabase, TailwindCSS.",
                icon: (
                  <svg className="w-6 h-6 text-[#FF7900]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                title: "Scalable & Reliable",
                desc: "Code built to grow with your needs.",
                icon: (
                  <svg className="w-6 h-6 text-[#FF7900]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )
              }
            ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-white/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-white/40">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#FF7900]/10 rounded-lg">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-black/90 mb-1">{item.title}</h3>
                    <p className="text-black/70 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#FF7900] px-8 py-4 text-white font-semibold shadow-lg hover:bg-[#e66d00] hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Work With Me
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24 scroll-mt-12 md:scroll-mt-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7900]/10 text-[#FF7900] text-sm font-semibold mb-6">
              Featured Projects
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Solutions I&rsquo;ve Built —<br />
              <span className="text-[#FF7900]">Tailored for Real People, Real Problems</span>
            </h2>
          </div>

          <div className="space-y-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="group relative rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7900]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Image
                  src="/assets/haosrai.png"
                  alt="HAOSRAI School Website"
                  width={1200}
                  height={800}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 rounded-full text-sm font-semibold text-[#FF7900]">
                  Educational
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black/90 mb-2">HAOSRAI</h3>
                  <p className="text-[#FF7900] font-semibold text-sm mb-4">School Website</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <p className="text-black/70"><span className="font-semibold">Challenge:</span> The school needed a modern website to showcase its programs and admissions.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70"><span className="font-semibold">Solution:</span> Designed and developed a clean, scalable platform with Next.js + Supabase.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70"><span className="font-semibold">Result:</span> A professional online presence that attracts students and parents.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center md:[&>*:first-child]:order-2">
              <div className="group relative rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7900]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Image
                  src="/assets/verjann.png"
                  alt="Verj & Ann Wedding Website"
                  width={1200}
                  height={800}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 rounded-full text-sm font-semibold text-[#FF7900]">
                  Personal
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black/90 mb-2">Verj & Ann Wedding Website</h3>
                  <p className="text-[#FF7900] font-semibold text-sm mb-4">Wedding Site</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <p className="text-black/70"><span className="font-semibold">Challenge:</span> The couple wanted a stylish, interactive digital invitation.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70"><span className="font-semibold">Solution:</span> Custom wedding site with RSVP, countdown, and guest info.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70"><span className="font-semibold">Result:</span> Guests had a smooth, engaging experience — all in one place.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setFormStart(Date.now()); }}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7900] px-8 py-4 text-white font-semibold shadow-lg hover:bg-[#e66d00] hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              See How I Can Help You
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-gradient-to-br from-[#ffe9d6] to-[#fff5ee] py-16 md:py-24 scroll-mt-14 md:scroll-mt-18 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 70% 70%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 10% 80%, rgba(255, 121, 0, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 text-[#FF7900] text-sm font-semibold mb-6">
            Tech Stack
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">The Tools I Use to Build Your<br />
            <span className="text-[#FF7900]">Future-Ready Web App</span>
          </h2>
          <p className="mt-6 text-lg text-black/70 max-w-2xl mx-auto">I build scalable solutions using modern technologies trusted by startups, schools, and enterprises.</p>
          
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js", image: "/assets/nextjs.png", category: "Frontend" },
              { name: "Vue.js", image: "/assets/vuejs.png", category: "Frontend" },
              { name: "Laravel", image: "/assets/laravel.png", category: "Backend" },
              { name: "TailwindCSS", image: "/assets/tailwind.png", category: "Styling" },
              { name: "Shadcn", image: "/assets/shadcn.png", category: "UI Components" },
              { name: "Supabase", image: "/assets/supabase.png", category: "Database" },
            ].map((tech) => (
              <div key={tech.name} className="group relative rounded-2xl border bg-white/60 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white border-white/40">
                <div className="text-3xl mb-3 text-center group-hover:scale-110 transition-transform"><Image src={tech.image} alt={tech.name} width={40} height={40} className="object-contain mx-auto"/></div>
                <h3 className="font-bold text-black/90 mb-1">{tech.name}</h3>
                <p className="text-xs text-[#FF7900] font-semibold">{tech.category}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF7900]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white/60 rounded-2xl border border-white/40 max-w-4xl mx-auto">
            <h3 className="text-lg md:text-xl font-bold text-black/90 mb-4 text-left md:text-center">Why These Technologies?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#FF7900] rounded-full"></span>
                  <span className="font-semibold text-sm">Performance</span>
                </div>
                <p className="text-sm text-black/70">Optimized for speed and scalability</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#FF7900] rounded-full"></span>
                  <span className="font-semibold text-sm">Modern</span>
                </div>
                <p className="text-sm text-black/70">Latest industry best practice standards</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#FF7900] rounded-full"></span>
                  <span className="font-semibold text-sm">Reliable</span>
                </div>
                <p className="text-sm text-black/70">Battle-tested by millions of applications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24 scroll-mt-12 md:scroll-mt-14">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 items-center">
          <div className="relative rounded-full overflow-hidden w-[300px] h-[400px] md:w-[380px] md:h-[530px] place-self-center md:place-self-start shadow-lg bg-[#FF7900]">
              <Image
                src="/assets/me.png"
                alt="Portrait"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full max-w-2xl md:justify-self-end mx-auto text-left mt-10 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-semibold">Meet Abel, Your Full-Stack Partner</h2>
            <p className="mt-10 text-black/70 font-semibold">Hi, I’m Abel</p>
            <p className="mt-2 text-black/70">
              I’m a full-stack developer passionate about solving problems with technology. Over the last 8+ years, I’ve worked in IT services, education, and government — helping organizations streamline operations and individuals bring their digital ideas to life.
            </p>
            <p className="mt-2 text-black/70">
              Whether you need a modern school website, a business app, or a custom digital solution, I’ll be your one-stop partner — from concept to launch.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 opacity-80">
              <Image src="/assets/zap.png" alt="" width={40} height={40} className="rounded-full w-12 h-12 md:w-14 md:h-14" />
              <Image src="/assets/tesda.png" alt="" width={40} height={40} className="rounded-full w-12 h-12 md:w-14 md:h-14" />
              <Image src="/assets/bpc.png" alt="" width={40} height={40} className="rounded-full w-12 h-12 md:w-14 md:h-14" />
              <Image src="/assets/dswd.png" alt="" width={40} height={40} className="rounded-full w-12 h-12 md:w-14 md:h-14" />
            </div>
            <div className="mt-2 text-center md:text-left">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#FF7900] px-8 py-4 text-white font-semibold shadow-lg hover:bg-[#e66d00] hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Work With Me
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-[#FF7900] text-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Let’s Build Something Great Together</h2>
          <p className="mt-2 opacity-90 max-w-2xl mx-auto">If you’re ready to bring your digital idea to life, I’d love to hear from you. Reach out and I’ll personally respond within 24 hours.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-8 py-4 text-[#FF7900] font-semibold shadow-lg hover:bg-[#FF7900] hover:shadow-xl transition-all hover:text-white hover:border-white hover:border-2 duration-200 hover:scale-105"
          >
            Send Me an Email
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <nav className="flex items-center justify-center gap-6 text-sm text-black/70">
            <a href="#about" className="hover:text-black">About</a>
            <a href="#projects" className="hover:text-black">Projects</a>
            <a href="#skills" className="hover:text-black">Skills</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </nav>
          <div className="mt-6 h-[2px] bg-[#FF7900]/80 rounded-full" />
          <p className="mt-6 text-xs text-black/60">© {new Date().getFullYear()} Abel Palero — Full-stack Web Developer.</p>
        </div>
      </footer>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeContactModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-xl border p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              className="absolute right-4 top-4 text-black/60 hover:text-black"
              onClick={closeContactModal}
            >
              ✕
            </button>
            <h3 className="text-xl md:text-2xl font-semibold">Work With Me</h3>
            <p className="mt-1 text-sm text-black/60">Send me a quick message and I’ll reply by email.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-black/80">Your Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7900]/50"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              {/* Honeypot field - hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <label>Leave this field empty</label>
                <input type="text" name="company" autoComplete="off" tabIndex={-1} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/80">Your Email</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF7900]/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/80">Message</label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 min-h-28 outline-none focus:ring-2 focus:ring-[#FF7900]/50"
                  placeholder="Briefly describe your project goals, timeline, and budget."
                  required
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeContactModal}
                  className="inline-flex items-center rounded-full border px-5 py-2 text-sm font-medium hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-full bg-[#FF7900] px-6 py-2 text-white text-sm font-medium shadow-sm hover:bg-[#e66d00] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
              <p className="text-[11px] text-black/50">Your message is securely sent via Supabase.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
