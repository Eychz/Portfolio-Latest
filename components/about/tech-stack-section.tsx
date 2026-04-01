import { Code2 } from "lucide-react";

import { column1, column2, column3 } from "@/components/Files/TechStackData";

export function TechStackSection() {

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Code2 className="h-8 w-8" />
        <h2 className="text-3xl md:text-4xl font-bold">Tech Stack</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[column1, column2, column3].map((column, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {column.map((tech) => (
              <div
                key={tech.name}
                className="group flex items-center gap-3 rounded-full border border-border px-4 py-2 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                <span className="text-sm font-medium flex-shrink-0 w-32 truncate group-hover:text-primary transition-colors duration-300">
                  {tech.name}
                </span>
                <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground group-hover:bg-primary transition-colors duration-500 ease-out"
                    style={{ width: `${tech.level}%` }}
                  />
                </div>
                {/* Animated Percentage Text */}
                <div className="w-0 opacity-0 group-hover:w-8 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-end overflow-hidden shrink-0 z-10">
                  <span className="text-xs font-bold text-primary tabular-nums">
                    {tech.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
