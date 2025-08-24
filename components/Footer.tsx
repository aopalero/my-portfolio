import { NAVIGATION_LINKS } from "@/lib/constants";

interface FooterProps {
  onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Footer component with navigation links and copyright
 */
export function Footer({ onNavLinkClick }: FooterProps) {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <nav className="flex items-center justify-center gap-6 text-sm text-black/70">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavLinkClick}
              className="hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <p className="mt-6 text-xs text-black/60">
          © {new Date().getFullYear()} Abel Palero — Full-stack Web Developer.
        </p>
      </div>
    </footer>
  );
}
