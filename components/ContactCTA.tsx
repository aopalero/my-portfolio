import { Button } from "@/components/ui/button";

interface ContactCTAProps {
  onContactClick: () => void;
}

/**
 * Contact call-to-action section
 */
export function ContactCTA({ onContactClick }: ContactCTAProps) {
  return (
    <section id="contact" className="bg-[#FF7900] text-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Let&rsquo;s Build Something Great Together
        </h2>
        
        <p className="mt-2 opacity-90 max-w-2xl mx-auto">
          If you&rsquo;re ready to bring your digital idea to life, I&rsquo;d love to hear from you. 
          Reach out and I&rsquo;ll personally respond within 24 hours.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={onContactClick}
            variant="secondary"
            size="xl"
            className="mt-12"
          >
            Send Me an Email
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
