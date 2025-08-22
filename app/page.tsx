"use client";
import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "your@email.com";

  const closeContactModal = () => setIsModalOpen(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `New inquiry from ${formName || "Website Visitor"}`;
    const body = [
      `Name: ${formName || "(not provided)"}`,
      `Email: ${formEmail || "(not provided)"}`,
      "",
      "Message:",
      formMessage || "(no message)",
    ].join("\n");
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setIsModalOpen(false);
    setFormName("");
    setFormEmail("");
    setFormMessage("");
  };

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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/[.06]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center text-2xl font-semibold">
            <span className="text-[#FF7900]">ao</span>
            <span className="text-black">palero</span>
          </a>
          <nav className="hidden md:flex items-center gap-12 text-sm text-black/70">
            <a href="#about" className="hover:text-black">About</a>
            <a href="#projects" className="hover:text-black">Projects</a>
            <a href="#skills" className="hover:text-black">Skills</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </nav>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
            className="inline-flex items-center rounded-full bg-[#FF7900] px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-[#e66d00] transition"
          >
            Work With Me
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="w-full scroll-mt-24 md:scroll-mt-28">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="w-full max-w-2xl mx-auto text-center md:text-left order-2 md:order-1">
            <p className="text-black/70 text-lg">Full-stack Web Developer</p>
            <h1 className="mt-4 text-4xl md:text-6xl md:w-[600px] font-bold tracking-tight">
              I Build <span className="text-[#FF7900]">Scalable</span> Web
              Applications That
              <br className="hidden md:block" />
              <span className="text-[#FF7900]"> Solve</span> Real Problems.
            </h1>
            <p className="mt-6 text-black/60 max-w-xl">
              From schools and organizations to businesses and personal projects, I
              deliver end-to-end solutions — frontend, backend, and everything in
              between. No need to hire multiple developers. With me, you get it
              all.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                className="inline-flex items-center justify-center rounded-full bg-[#FF7900] px-6 py-3 text-white font-medium shadow-sm transition transform hover:bg-[#e66d00] hover:scale-[1.02]"
              >
                Let’s Build Together
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-[#FF7900] text-[#FF7900] px-6 py-3 font-medium hover:bg-[#fff5ee]"
              >
                View My Projects
              </a>
            </div>
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 opacity-80">
              <Image src="/assets/zap.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
              <Image src="/assets/tesda.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
              <Image src="/assets/bpc.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
              <Image src="/assets/dswd.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
            </div>
          </div>

           <div className="relative rounded-full overflow-hidden w-[320px] h-[320px] md:w-[420px] md:h-[600px] place-self-center md:place-self-end shadow-lg bg-[#FF7900] order-1 md:order-2">
              <Image
                src="/assets/me.png"
                alt="Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
        </div>
      </section>

      {/* USP */}
      <section className="bg-[#ffe9d6] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why Struggle With Multiple Developers When One Expert Can Handle It All?
          </h2>
          <p className="mt-4 text-black/70 max-w-3xl mx-auto">
            Hiring separate frontend and backend developers is expensive, time-consuming, and frustrating.
            I handle your project end-to-end — from UI design to database architecture.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-6 text-left">
            {["End-to-End Development: One developer, complete solution.",
              "Adaptable Experience: From government to schools to personal projects.",
              "Modern Tech Stack: Next.js, Vue.js, Laravel, Supabase, TailwindCSS.",
              "Scalable & Reliable: Code built to grow with your needs."]
              .map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#FF7900] mt-1" />
                  <p className="text-black/80">{text}</p>
                </div>
              ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
            className="mt-10 inline-flex items-center rounded-full bg-[#FF7900] px-6 py-3 text-white font-medium hover:bg-[#e66d00]"
          >
            Work With Me
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24 scroll-mt-12 md:scroll-mt-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Solutions I’ve Built — Tailored for Real People, Real Problems
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden shadow-sm border">
              <Image
                src="/assets/haosrai.png"
                alt="School website"
                width={1200}
                height={800}
                className="w-full h-64 object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">HAOSRAI</h3>
              <p className="mt-4 text-black/70"><span className="font-semibold">Challenge:</span> The school needed a modern website to showcase its programs and admissions.</p>
              <p className="mt-2 text-black/70"><span className="font-semibold">Solution:</span> Designed and developed a clean, scalable platform with Next.js + Supabase.</p>
              <p className="mt-2 text-black/70"><span className="font-semibold">Result:</span> A professional online presence that attracts students and parents.</p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-10 items-center md:[&>*:first-child]:order-2">
            <div className="rounded-xl overflow-hidden shadow-sm border">
              <Image
                src="/assets/verjann.png"
                alt="Wedding site"
                width={1200}
                height={800}
                className="w-full h-64 object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Verj & Ann Wedding Website</h3>
              <p className="mt-4 text-black/70"><span className="font-semibold">Challenge:</span> The couple wanted a stylish, interactive digital invitation.</p>
              <p className="mt-2 text-black/70"><span className="font-semibold">Solution:</span> Custom wedding site with RSVP, countdown, and guest info.</p>
              <p className="mt-2 text-black/70"><span className="font-semibold">Result:</span> Guests had a smooth, engaging experience — all in one place.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
              className="inline-flex items-center rounded-full bg-[#FF7900] px-6 py-3 text-white font-medium hover:bg-[#e66d00]"
            >
              See How I Can Help You
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-[#ffe9d6] py-14 scroll-mt-24 md:scroll-mt-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">The Tools I Use to Build Your Future-Ready Web App</h2>
          <p className="mt-2 text-black/60">I build scalable solutions using modern technologies trusted by startups, schools, and enterprises.</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-6 gap-6">
            {[
              "Next.js",
              "Vue.js",
              "Laravel",
              "TailwindCSS",
              "Shadcn",
              "Supabase",
            ].map((name) => (
              <div key={name} className="rounded-xl border bg-white py-8 text-sm font-semibold shadow-sm hover:shadow-md transition">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-full overflow-hidden w-[300px] h-[300px] md:w-[380px] md:h-[530px] place-self-center md:place-self-start shadow-lg bg-[#FF7900] mr-0 md:mr-38">
              <Image
                src="/assets/me.png"
                alt="Portrait"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full max-w-2xl md:justify-self-end mx-auto text-left">
            <h2 className="text-3xl md:text-4xl font-semibold">Meet Abel, Your Full-Stack Partner</h2>
            <p className="mt-10 text-black/70 font-semibold">Hi, I’m Abel</p>
            <p className="mt-2 text-black/70">
              I’m a full-stack developer passionate about solving problems with technology. Over the last 8+ years, I’ve worked in IT services, education, and government — helping organizations streamline operations and individuals bring their digital ideas to life.
            </p>
            <p className="mt-2 text-black/70">
              Whether you need a modern school website, a business app, or a custom digital solution, I’ll be your one-stop partner — from concept to launch.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 opacity-80">
              <Image src="/assets/zap.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
              <Image src="/assets/tesda.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
              <Image src="/assets/bpc.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
              <Image src="/assets/dswd.png" alt="" width={80} height={80} className="rounded-full w-12 h-12 md:w-20 md:h-20" />
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
              className="mt-8 flex w-fit mx-auto md:mx-0 items-center rounded-full bg-[#FF7900] px-6 py-3 text-white font-medium hover:bg-[#e66d00]"
            >
              Work With Me
            </a>
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
              className="inline-flex items-center justify-center rounded-full bg-white/95 text-[#FF7900] px-6 py-3 font-medium hover:bg-white"
            >
              Send Me an Email
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
                  className="inline-flex items-center rounded-full bg-[#FF7900] px-6 py-2 text-white text-sm font-medium shadow-sm hover:bg-[#e66d00]"
                >
                  Send via Email
                </button>
              </div>
              <p className="text-[11px] text-black/50">This uses your email client via mailto to send to <span className="font-medium">{contactEmail}</span>.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
