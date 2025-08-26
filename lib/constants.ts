/**
 * Application constants and configuration
 */

export const NAVIGATION_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const CLIENT_LOGOS = [
  { src: "/assets/zap.png", alt: "ZAP Logo" },
  { src: "/assets/tesda.png", alt: "TESDA Logo" },
  { src: "/assets/bpc.png", alt: "BPC Logo" },
  { src: "/assets/dswd.png", alt: "DSWD Logo" },
] as const;

export const TECHNOLOGIES = [
  { name: "Next.js", image: "/assets/nextjs.png", category: "Frontend" },
  { name: "Vue.js", image: "/assets/vuejs.png", category: "Frontend" },
  { name: "Laravel", image: "/assets/laravel.png", category: "Backend" },
  { name: "TailwindCSS", image: "/assets/tailwind.png", category: "Styling" },
  { name: "Shadcn", image: "/assets/shadcn.png", category: "UI Components" },
  { name: "Supabase", image: "/assets/supabase.png", category: "Database" },
] as const;

export const PROJECTS = [
  {
    id: "lorren",
    title: "Lorren",
    subtitle: "Portfolio Website",
    image: "/assets/lorren.png",
    category: "Portfolio",
    challenge: "The client wanted a modern, clean portfolio website to showcase their work.",
    solution: "Designed and developed a clean, scalable platform with Next.js, TailwindCSS, and Shadcn.",
    result: "Delivered a modern, professional portfolio that effectively showcases the client's work and personal brand.",
    imageFirst: true,
    url: "https://lorren-smm.vercel.app"
  },
  {
    id: "verjann",
    title: "Verj & Ann",
    subtitle: "Wedding Invitation Website",
    image: "/assets/verjann.png",
    category: "Wedding",
    challenge: "The couple wanted a stylish, interactive digital invitation.",
    solution: "Custom wedding site with RSVP, countdown, and guest info using Next.js, TailwindCSS, and Shadcn.",
    result: "Guests had a smooth, engaging experience — all in one place.",
    imageFirst: false,
    url: "https://verj-ann-wedding-invitation.vercel.app"
  },
  {
    id: "hirayatripsph",
    title: "HirayaTripsPH",
    subtitle: "Travel Agency Website",
    image: "/assets/hirayatripsph.png",
    category: "Travel",
    challenge: "The travel agency needed a modern website to showcase its services and bookings.",
    solution: "Designed and developed a clean, scalable platform with Next.js, TailwindCSS, and Shadcn.",
    result: "Increased online visibility and streamlined booking process for travel services.",
    imageFirst: true,
    url: "https://hirayatripsph-gamma.vercel.app"
  },
] as const;

export const BENEFITS = [
  {
    title: "End-to-End Development",
    desc: "One developer, complete solution.",
    icon: "lightning"
  },
  {
    title: "Adaptable Experience", 
    desc: "From government to schools to personal projects.",
    icon: "check"
  },
  {
    title: "Modern Tech Stack",
    desc: "Next.js, Vue.js, Laravel, Supabase, TailwindCSS.",
    icon: "code"
  },
  {
    title: "Scalable & Reliable",
    desc: "Code built to grow with your needs.",
    icon: "chart"
  }
] as const;

export const TECHNOLOGY_BENEFITS = [
  {
    title: "Performance",
    description: "Optimized for speed and scalability"
  },
  {
    title: "Modern",
    description: "Latest industry best practice standards"
  },
  {
    title: "Reliable",
    description: "Battle-tested by millions of applications"
  }
] as const;
