"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectCard, ProjectCardType } from "@/components/ui/project-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatedProjectGridProps {
  projects: ProjectCardType[];
  categories: string[];
  itemsPerPage?: number;
  gridClassName?: string;
}

export function PaginatedProjectGrid({
  projects,
  categories,
  itemsPerPage = 4,
  gridClassName = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
}: PaginatedProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCategory = (category: string) => {
    setCurrentPage(1);
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories([category]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    const categoryString = Array.isArray(project.category) ? project.category.join(" ") : project.category;

    const matchesSearch = !searchQuery ||
      project.title.toLowerCase().includes(searchLower) ||
      categoryString.toLowerCase().includes(searchLower) ||
      (project.description && project.description.toLowerCase().includes(searchLower));

    const matchesCategories = selectedCategories.includes("All") ||
      selectedCategories.some(category =>
        categoryString.toLowerCase().includes(category.toLowerCase()) ||
        project.title.toLowerCase().includes(category.toLowerCase())
      );

    return matchesSearch && matchesCategories;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Filters and Search */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
        <div className="flex-1 flex flex-wrap gap-2 items-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className="cursor-pointer px-5 py-3 rounded-full transition-colors"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9 w-full rounded-full bg-background"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto pb-4">
        {paginatedProjects.length > 0 ? (
          <div className={gridClassName}>
            {paginatedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            No projects found matching your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 pt-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrevious();
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(page);
                    }}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
