import type { Metadata } from "next"
import { FeaturedProjects } from "@/components/projects/featured-projects"
import { GraphicDesigns } from "@/components/projects/graphic-designs"
import { ProjectShowcase } from "@/components/projects/project-showcase"
import { SystemProjects } from "@/components/projects/system-projects"
import { getProjects } from "@/lib/api"

export const metadata: Metadata = { title: "Projects" }

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <ProjectShowcase />
      <FeaturedProjects projects={projects.filter((p) => p.featured)} />
      <SystemProjects projects={projects.filter((p) => p.type === "SYSTEM")} />
      <GraphicDesigns projects={projects.filter((p) => p.type === "GRAPHIC_DESIGN")} />
    </>
  )
}
