"use client";

import { Layout } from "lucide-react";
import { graphicDesignProjects } from "@/components/Files/ProjectData";
import { PaginatedProjectGrid } from "@/components/ui/paginated-project-grid";
import { BackButton } from "@/components/ui/back-button";

const categories = ["All", "Esports Jersey", "Sportwear", "School", "Commission"];

export default function GraphicDesignsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <BackButton label="Back to Projects" />
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Layout className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Graphic Designs Gallery</h1>
      </div>
      <PaginatedProjectGrid
        projects={graphicDesignProjects}
        categories={categories}
        itemsPerPage={12}
        gridClassName="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max"
      />
    </div>
  );
}
