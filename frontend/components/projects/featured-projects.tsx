import { ProjectCard } from "@/components/shared/project-card";
import type { Project } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="featured" />
        ))}
      </div>
    </section>
  );
}
