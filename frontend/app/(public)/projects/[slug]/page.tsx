import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { isRemoteImage } from "@/utils/format";
import { formatCategories } from "@/utils/project";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description ?? undefined,
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const project = await getProjectBySlug((await params).slug);

  if (!project) {
    notFound();
  }

  const categoryText = formatCategories(project.categories);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 animate-in fade-in zoom-in-95 duration-500">
      <BackButton label="Back to Projects" />

      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-sm border border-border bg-card">
        {project.image && (
          <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-muted relative border-b border-border overflow-hidden flex items-center justify-center p-4 md:p-12">
            <Image
              src={project.image}
              alt={project.title}
              unoptimized={isRemoteImage(project.image)}
              width={2000}
              height={2000}
              sizes="(min-width: 896px) 896px, 100vw"
              priority
              className="h-auto w-auto max-h-[60vh] max-w-full object-contain hover:scale-105 transition-transform duration-700 rounded-xl shadow-xl"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          <div className="mb-6">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">{categoryText}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">{project.title}</h1>

          {project.description && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>
          )}

          {project.link && (
            <div className="pt-6 border-t border-border">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
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
