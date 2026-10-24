import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/components/shared/project-card";
import type { Project } from "@/lib/types";
import { isRemoteImage } from "@/utils/format";

export function GraphicDesigns({ projects: graphicDesignProjects }: { projects: Project[] }) {
  const visibleProjects = graphicDesignProjects.slice(0, 3);
  const stackImages = graphicDesignProjects.slice(3, 6);
  const remainingCount = Math.max(0, graphicDesignProjects.length - 3);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Graphic Designs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
        {visibleProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}

        <Link href="/graphic-designs" className="block relative rounded-2xl border-2 border-border overflow-hidden bg-muted group cursor-pointer h-full min-h-[250px] shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 overflow-hidden">
            {stackImages.map((project, index) => (
              <div
                key={project.id}
                className="absolute inset-0 border border-border bg-card shadow-2xl transition-transform duration-500"
                style={{
                  transform: `translateY(${index * 15}px) scale(${1 - index * 0.08})`,
                  zIndex: 10 - index,
                  opacity: 0.6 - (index * 0.15)
                }}
              >
                {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized={isRemoteImage(project.image)}
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                )}
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
