import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface ProjectCardType {
  title: string;
  category: string | string[];
  description?: string;
  icon: any;
  image?: string;
  link?: string;
  slug?: string;
}

interface ProjectCardProps {
  project: ProjectCardType;
  variant?: "default" | "featured";
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const Icon = project.icon;
  const isFeatured = variant === "featured";

  return (
    <Card className="group rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-card/50 backdrop-blur-sm flex flex-col h-full">
      <CardContent className={`flex-1 flex flex-col ${isFeatured ? "p-6" : "p-4"}`}>
        {/* Image or Icon */}
        <Link 
          href={`/projects/${project.slug}`}
          className={`${isFeatured ? "aspect-[4/3] mb-4" : "aspect-square mb-3"} block flex-shrink-0 overflow-hidden rounded-xl border-2 border-border relative bg-muted/20 group-hover:border-primary/50 transition-colors focus:outline-none`}
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <Icon 
                className={`${isFeatured ? "h-16 w-16" : "h-12 w-12"} text-muted-foreground group-hover:text-primary transition-colors`} 
                strokeWidth={1} 
              />
            </div>
          )}
        </Link>

        <div className="flex-1 flex flex-col">
          {/* Category & Featured Links */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground underline">
              {Array.isArray(project.category) ? project.category.join(", ") : project.category}
            </span>
            {isFeatured && (
              <div className="flex items-center gap-2">
                {project.link && project.link.startsWith("http") && (
                  <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    <p className="text-xs">Live Site</p>
                  </Link>
                )}
                <Link href={`/projects/${project.slug}`} className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <p className="text-xs">Details</p>
                </Link>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm tracking-tight">{project.title}</h3>

          {/* Description */}
          {project.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Default CTA */}
          {!isFeatured && (
            <div className="mt-auto pt-4 flex gap-2">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex flex-1 justify-center items-center gap-1 text-xs bg-foreground text-background px-3 py-1.5 rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                View Full Details
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
