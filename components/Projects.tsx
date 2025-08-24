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
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7900]/10 text-[#FF7900] text-sm font-semibold mb-6">
            Featured Projects
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Solutions I&rsquo;ve Built —<br />
            <span className="text-[#FF7900]">Tailored for Real People, Real Problems</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {PROJECTS.map((project) => (
            <div key={project.id} className={`grid md:grid-cols-2 gap-10 items-center ${project.imageFirst ? 'md:[&>*:first-child]:order-2' : ''}`}>
              {/* Project Image */}
              <div className="group relative rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7900]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                  aria-label={`Visit ${project.title} project`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.subtitle}`}
                    width={1200}
                    height={800}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 rounded-full text-sm font-semibold text-[#FF7900]">
                  {project.category}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black/90 mb-2">{project.title}</h3>
                  <p className="text-[#FF7900] font-semibold text-sm mb-4">{project.subtitle}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <p className="text-black/70">
                      <span className="font-semibold">Challenge:</span> {project.challenge}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70">
                      <span className="font-semibold">Solution:</span> {project.solution}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-black/70">
                      <span className="font-semibold">Result:</span> {project.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button
            onClick={onContactClick}
            size="xl"
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
