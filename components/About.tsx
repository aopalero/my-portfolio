import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CLIENT_LOGOS } from "@/lib/constants";

interface AboutProps {
  onContactClick: () => void;
}

/**
 * About section with personal introduction and client logos
 */
export function About({ onContactClick }: AboutProps) {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 items-center gap-8 lg:gap-12">
        {/* Portrait Image */}
        <div className="relative rounded-full overflow-hidden w-[280px] h-[370px] md:w-[320px] md:h-[420px] lg:w-[380px] lg:h-[530px] place-self-center lg:place-self-start shadow-lg bg-[#FF7900]">
          <Image
            src="/assets/me.png"
            alt="Abel Palero - Full-stack Web Developer"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full max-w-2xl lg:justify-self-end mx-auto text-left mt-10 lg:mt-0">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Meet Abel, Your Full-Stack Partner
          </h2>
          
          <p className="mt-10 text-black/70 font-semibold">Hi, I&rsquo;m Abel</p>
          
          <p className="mt-2 text-black/70">
            I&rsquo;m a full-stack developer passionate about solving problems with technology. 
            Over the last 8+ years, I&rsquo;ve worked in IT services, education, and government — 
            helping organizations streamline operations and individuals bring their digital ideas to life.
          </p>
          
          <p className="mt-2 text-black/70">
            Whether you need a modern school website, a business app, or a custom digital solution, 
            I&rsquo;ll be your one-stop partner — from concept to launch.
          </p>
          
          {/* Client Logos */}
          <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 opacity-80">
            {CLIENT_LOGOS.map((logo) => (
              <Image 
                key={logo.alt}
                src={logo.src} 
                alt={logo.alt} 
                width={40} 
                height={40} 
                className="rounded-full w-12 h-12 md:w-14 md:h-14" 
              />
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="mt-2 text-center lg:text-left">
            <Button
              onClick={onContactClick}
              size="xl"
              className="mt-12"
            >
              Work With Me
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
