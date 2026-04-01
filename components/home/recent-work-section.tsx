"use client";

import { Folder } from "lucide-react";
import recentWorks from "@/components/Files/RecentWorks";
import { PaginatedProjectGrid } from "@/components/ui/paginated-project-grid";
import { ProjectCardType } from "@/components/ui/project-card";

const suggestedWorks = ["All", "Graphic Designs", "Jersey Mockup", "Web Development", "School Projects", "Event Production", "Film Making"];

export function RecentWorkSection() {
  const mappedProjects: ProjectCardType[] = recentWorks.map((work) => ({
    title: work.title,
    category: work.tags && work.tags.length > 0 ? work.tags : ["Project"],
    description: work.description,
    image: work.image,
    icon: Folder,
    link: work.link || "#",
    slug: work.slug,
  }));

  return (
    <section className="bg-background flex flex-col md:px-20 md:py-20 lg:px-45 lg:py-35">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Recent Work</h2>
        <p className="text-sm text-muted-foreground">
          A quick look at what I've been building lately.
        </p>
      </div>

      <PaginatedProjectGrid
        projects={mappedProjects}
        categories={suggestedWorks}
        gridClassName="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max"
      />
    </section>
  );
}
