"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { USP } from "@/components/USP";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";

/**
 * Main portfolio page component
 */
export default function Home() {
  const { isModalOpen, formStart, openModal, closeModal } = useContactModal();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle escape key for modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onContactClick={openModal} />
      <Hero onContactClick={openModal} />
      <USP onContactClick={openModal} />
      <Projects onContactClick={openModal} />
      <Skills />
      <About onContactClick={openModal} />
      <ContactCTA onContactClick={openModal} />
      <Footer onNavLinkClick={handleNavLinkClick} />
      
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formStart={formStart}
      />
    </div>
  );
}
