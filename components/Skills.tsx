import Image from "next/image";
import { TECHNOLOGIES, TECHNOLOGY_BENEFITS } from "@/lib/constants";

/**
 * Skills section showcasing technical expertise
 */
export function Skills() {
  return (
    <section id="skills" className="bg-gradient-to-br from-[#ffe9d6] to-[#fff5ee] py-16 md:py-20 lg:py-24 scroll-mt-20 md:scroll-mt-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 70% 70%, rgba(255, 121, 0, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 10% 80%, rgba(255, 121, 0, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>
      
      <div className="mx-auto max-w-5xl px-6 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 text-[#FF7900] text-sm font-semibold mb-6">
          Tech Stack
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          The Tools I Use to Build Your<br />
          <span className="text-[#FF7900]">Future-Ready Web App</span>
        </h2>
        
        <p className="mt-6 text-lg text-black/70 max-w-xl mx-auto">
          I build scalable solutions using modern technologies trusted by startups, schools, and enterprises.
        </p>
        
        {/* Technologies Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {TECHNOLOGIES.map((tech) => (
            <div 
              key={tech.name} 
              className="group relative rounded-2xl border bg-white/60 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white border-white/40"
            >
              <div className="text-3xl mb-3 text-center group-hover:scale-110 transition-transform">
                <Image 
                  src={tech.image} 
                  alt={tech.name} 
                  width={40} 
                  height={40} 
                  className="object-contain mx-auto"
                />
              </div>
              <h3 className="font-bold text-black/90 mb-1">{tech.name}</h3>
              <p className="text-xs text-[#FF7900] font-semibold">{tech.category}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF7900]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 p-8 bg-white/60 rounded-2xl border border-white/40 max-w-4xl mx-auto">
          <h3 className="text-lg md:text-xl font-bold text-black/90 mb-4 text-left md:text-center">
            Why These Technologies?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {TECHNOLOGY_BENEFITS.map((benefit) => (
              <div key={benefit.title}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#FF7900] rounded-full"></span>
                  <span className="font-semibold text-sm">{benefit.title}</span>
                </div>
                <p className="text-sm text-black/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
