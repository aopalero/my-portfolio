import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/constants";

interface ProjectsProps {
  onContactClick: () => void;
}

/**
 * Projects section showcasing featured work
 */
export function Projects({ onContactClick }: ProjectsProps) {
  return (
    <section id="projects" className="py-16 md:py-20 lg:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7900]/10 text-[#FF7900] text-sm font-semibold mb-6">
            Featured Projects
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-4">
            Solutions I&rsquo;ve Built —<br />
            <span className="text-[#FF7900]">Tailored for Real People, Real Problems</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16 md:space-y-20">
          {PROJECTS.map((project) => (
            <div key={project.id} className={`grid gap-8 md:gap-10 items-center ${project.imageFirst ? 'md:grid-cols-2 md:[&>*:first-child]:order-2' : 'md:grid-cols-2'}`}>
              {/* Project Image */}
              <div className="group relative rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7900]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:opacity-90 transition-opacity relative z-10"
                  aria-label={`Visit ${project.title} project`}
                  onClick={() => console.log('Clicked project:', project.title, 'URL:', project.url)}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.subtitle}`}
                    width={1200}
                    height={800}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover pointer-events-none"
                  />
                </a>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 rounded-full text-sm font-semibold text-[#FF7900]">
                  {project.category}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black/90 mb-2">{project.title}</h3>
                  <p className="text-[#FF7900] font-semibold text-sm mb-3 md:mb-4">{project.subtitle}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <p className="text-black/70 text-sm sm:text-base">
                      <span className="font-semibold">Challenge:</span> {project.challenge}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70 text-sm sm:text-base">
                      <span className="font-semibold">Solution:</span> {project.solution}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70 text-sm sm:text-base">
                      <span className="font-semibold">Result:</span> {project.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center px-4">
          <Button
            onClick={onContactClick}
            size="xl"
            className="w-full sm:w-auto"
          >
            See How I Can Help You
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
