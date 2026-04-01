import { ProjectShowcase } from "@/components/projects/project-showcase";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SystemProjects } from "@/components/projects/system-projects";
import { GraphicDesigns } from "@/components/projects/graphic-designs";


export default function ProjectsPage() {
  return (
    <>
      <ProjectShowcase />
      <FeaturedProjects />
      <SystemProjects />
      <GraphicDesigns />
    </>
  );
}
