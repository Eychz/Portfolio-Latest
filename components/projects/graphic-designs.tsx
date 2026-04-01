import Link from "next/link";
import { graphicDesignProjects } from "@/components/Files/ProjectData";
import { ProjectCard } from "@/components/ui/project-card";

export function GraphicDesigns() {
  const visibleProjects = graphicDesignProjects.slice(0, 3);
  const stackImages = graphicDesignProjects.slice(3, 6);
  const remainingCount = Math.max(0, graphicDesignProjects.length - 3);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Graphic Designs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
        {visibleProjects.map((project, index) => (
          <div key={index} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}

        <Link href="/graphic-designs" className="block relative rounded-2xl border-2 border-border overflow-hidden bg-muted group cursor-pointer h-full min-h-[250px] shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 overflow-hidden">
            {stackImages.map((project, index) => (
              <div
                key={index}
                className="absolute inset-0 border border-border bg-card shadow-2xl transition-transform duration-500"
                style={{
                  transform: `translateY(${index * 15}px) scale(${1 - index * 0.08})`,
                  zIndex: 10 - index,
                  opacity: 0.6 - (index * 0.15)
                }}
              >
                {(project as any).image ? (
                  <img
                    src={(project as any).image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-20 group-hover:bg-background/60 transition-colors">
            <span className="text-4xl md:text-3xl font-bold tracking-tighter mb-1 text-primary">+{remainingCount}</span>
            <span className="text-sm font-semibold flex flex-col items-center justify-center gap-1 group-hover:underline">
              View All Graphic Designs
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
