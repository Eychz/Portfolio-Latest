import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import recentWorks from "@/components/Files/RecentWorks";
import { systemProjects, eventProductionProjects, graphicDesignProjects } from "@/components/Files/ProjectData";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/back-button";

function getProjectBySlug(slug: string) {
  const recentWordMatch = recentWorks.find(w => w.slug === slug);
  if (recentWordMatch) return { ...recentWordMatch, category: recentWordMatch.tags };

  const systemMatch = systemProjects.find(p => p.slug === slug);
  if (systemMatch) return systemMatch;

  const eventMatch = eventProductionProjects.find(p => p.slug === slug);
  if (eventMatch) return eventMatch;

  const graphicMatch = graphicDesignProjects.find(p => p.slug === slug);
  if (graphicMatch) return graphicMatch;

  return null;
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const categoryText = Array.isArray(project.category) ? project.category.join(", ") : project.category;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 animate-in fade-in zoom-in-95 duration-500">
      <BackButton label="Back to Projects" />

      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-sm border border-border bg-card">
        {project.image && (
          <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-muted relative border-b border-border overflow-hidden flex items-center justify-center p-4 md:p-12">
            <img
              src={project.image}
              alt={project.title}
              className="max-h-[60vh] max-w-full object-contain hover:scale-105 transition-transform duration-700 rounded-xl shadow-xl"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          <div className="mb-6">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">{categoryText}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">{project.title}</h1>

          {('description' in project) && project.description && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>
          )}

          {('link' in project) && project.link && project.link !== "#" && (
            <div className="pt-6 border-t border-border">
              <Link
                href={project.link}
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform shadow-lg shadow-primary/20"
              >
                View Experience <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
