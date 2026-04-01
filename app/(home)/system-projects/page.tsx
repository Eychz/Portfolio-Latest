"use client";

import { Cpu } from "lucide-react";
import { systemProjects } from "@/components/Files/ProjectData";
import { PaginatedProjectGrid } from "@/components/ui/paginated-project-grid";
import { BackButton } from "@/components/ui/back-button";

const categories = ["All", "Municipality Portal", "Education", "Science", "Security", "Robotics"];

export default function SystemProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <BackButton label="Back to Projects" />
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Cpu className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">System Projects Gallery</h1>
      </div>
      <PaginatedProjectGrid projects={systemProjects} categories={categories} gridClassName="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max" />
    </div>
  );
}
