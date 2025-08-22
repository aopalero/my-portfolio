import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abel Palero — Full-stack Web Developer",
  description:
    "I build scalable web applications that solve real problems. End-to-end development: frontend, backend, and everything in between.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://aopalero.com"),
  openGraph: {
    title: "Abel Palero — Full-stack Web Developer",
    description:
      "From schools and organizations to businesses and personal projects, I deliver end-to-end solutions — frontend, backend, and everything in between.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${interSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
