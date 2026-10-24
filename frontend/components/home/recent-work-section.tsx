import { PaginatedProjectGrid } from "@/components/shared/paginated-project-grid";
import type { Project } from "@/lib/types";
import { collectCategories } from "@/utils/project";

export function RecentWorkSection({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-background flex flex-col px-4 py-12 md:px-20 md:py-20 lg:px-45 lg:py-35">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Recent Work</h2>
        <p className="text-sm text-muted-foreground">
          A quick look at what I&apos;ve been building lately.
        </p>
      </div>

      <PaginatedProjectGrid
        projects={projects}
        categories={collectCategories(projects)}
        gridClassName="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max"
      />
    </section>
  );
}
