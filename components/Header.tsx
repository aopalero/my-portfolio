"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_LINKS } from "@/lib/constants";

interface HeaderProps {
  onContactClick: () => void;
}

/**
 * Header component with navigation and mobile menu
 */
export function Header({ onContactClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        closeMobileMenu();
        
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[.08] shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={handleNavLinkClick} 
          className="flex items-center text-2xl font-bold tracking-tight hover:scale-105 transition-transform"
        >
          <span className="text-[#FF014F]">ao</span>
          <span className="text-black">palero</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-black/70">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavLinkClick}
              className="hover:text-[#FF014F] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
                      className="lg:hidden p-2 text-black/70 hover:text-[#FF014F] transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop CTA Button */}
        <Button
          onClick={onContactClick}
          size="default"
          className="hidden lg:inline-flex"
        >
          Work With Me
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-black/[.08] shadow-lg">
          <nav className="px-6 py-4 space-y-4">
            {NAVIGATION_LINKS.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={handleNavLinkClick}
                className="block py-2 text-base font-medium text-black/70 hover:text-[#FF014F] transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-black/[.08]">
              <Button
                onClick={() => {
                  onContactClick();
                  closeMobileMenu();
                }}
                size="lg"
                className="w-full"
              >
                Work With Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
