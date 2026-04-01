import Link from "next/link";
import { systemProjects } from "@/components/Files/ProjectData";
import { ProjectCard } from "@/components/ui/project-card";

export function SystemProjects() {
  const visibleProjects = systemProjects.slice(0, 3);
  const remainingCount = Math.max(0, systemProjects.length - 3);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">System Projects</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
        {visibleProjects.map((project, index) => (
          <div key={index} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}

        <Link href="/system-projects" className="block relative rounded-2xl border-2 border-primary/20 overflow-hidden bg-primary/5 group cursor-pointer h-full min-h-[250px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center gap-3">
             <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="text-primary font-bold">{remainingCount > 0 ? `+${remainingCount}` : "→"}</span>
             </div>
             <span className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors">
               View All System Projects
             </span>
             <p className="text-xs text-muted-foreground">Browse the complete gallery</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
