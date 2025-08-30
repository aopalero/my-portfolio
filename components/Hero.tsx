import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CLIENT_LOGOS } from "@/lib/constants";

interface HeroProps {
  onContactClick: () => void;
}

/**
 * Hero section component with main headline and CTA
 */
export function Hero({ onContactClick }: HeroProps) {
  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="w-full scroll-mt-20 md:scroll-mt-24 pt-8 md:pt-0">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        {/* Content */}
        <div className="w-full max-w-2xl mx-auto text-center lg:text-left order-1 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF014F]/10 text-[#FF014F] text-sm font-semibold mb-6">
            Full-stack Web Developer
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] md:w-4xl">
            I Build{" "}
            <span className="text-[#FF014F] relative">
              Scalable
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#FF014F] to-[#e60047] rounded-full"></div>
            </span>{" "}
            Web Applications That{" "}
            <br className="hidden lg:block" />
            <span className="text-[#FF014F] relative">
              Solve
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#FF014F] to-[#e60047] rounded-full"></div>
            </span>{" "}
            Real Problems.
          </h1>
          
          <p className="mt-6 text-lg text-black/70 max-w-xl leading-relaxed">
          Complete full-stack solutions for schools, organizations, businesses, and personal projects. Frontend, backend, and everything in between — delivered by one developer.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onContactClick}
              size="xl"
              className="group"
            >
              Let&rsquo;s Build Together
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={handleProjectsClick}
            >
              View My Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Button>
          </div>
          

        </div>

        {/* Hero Image */}
        <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] lg:w-[460px] lg:h-[600px] place-self-center lg:place-self-end order-2 lg:order-2">
          <div className=""></div>
          <Image
            src="/assets/hero.png"
            alt="Abel Palero - Full-stack Web Developer"
            fill
            className="object-cover z-0"
            priority
          />
        </div>
      </div>
    </section>
  );
}
