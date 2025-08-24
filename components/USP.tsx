import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { BENEFITS } from "@/lib/constants";

interface USPProps {
  onContactClick: () => void;
}

/**
 * Unique Selling Proposition section highlighting key benefits
 */
export function USP({ onContactClick }: USPProps) {
  return (
    <section className="bg-gradient-to-br from-[#ffe9d6] to-[#fff5ee] py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 80% 20%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 40% 80%, rgba(255, 121, 0, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>
      
      <div className="mx-auto max-w-5xl px-6 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 text-[#FF7900] text-sm font-semibold mb-6">
          Why Choose One Expert Over Many?
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Why Struggle With Multiple Developers<br />
          <span className="text-[#FF7900]">When One Expert Can Handle It All?</span>
        </h2>
        
        <p className="mt-6 text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
          Hiring separate frontend and backend developers is expensive, time-consuming, and frustrating.
          I handle your project end-to-end — from UI design to database architecture.
        </p>

        {/* Benefits Grid */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6 md:gap-8 text-left">
          {BENEFITS.map((benefit) => (
            <div 
              key={benefit.title} 
              className="flex items-start gap-4 p-6 bg-white/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-white/40"
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#FF7900]/10 rounded-lg">
                <Icon name={benefit.icon} />
              </div>
              <div>
                <h3 className="font-semibold text-black/90 mb-1">{benefit.title}</h3>
                <p className="text-black/70 text-sm">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
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
    </section>
  );
}
