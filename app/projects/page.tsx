import { ProjectShowcase } from "@/components/projects/project-showcase";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SystemProjects } from "@/components/projects/system-projects";
import { GraphicDesigns } from "@/components/projects/graphic-designs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";


export default function ProjectsPage() {
  return (
    <>
    <Header />
      <ProjectShowcase />
      <FeaturedProjects />
      <SystemProjects />
      <GraphicDesigns />
    <Footer />
    </>
  );
}
