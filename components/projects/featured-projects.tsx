import { featuredProjects } from "@/components/Files/ProjectData";
import { ProjectCard } from "@/components/ui/project-card";

export function FeaturedProjects() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} variant="featured" />
        ))}
      </div>
    </section>
  );
}
