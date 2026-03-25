import { Code2 } from "lucide-react";

const techStack = [
  { name: "React", level: 90 },
  { name: "Next JS", level: 85 },
  { name: "Express", level: 95 },
  { name: "Node", level: 90 },
  { name: "Adobe Premiere Pro", level: 80 },
  { name: "Adobe Photoshop", level: 85 },
  { name: "C#", level: 60 },
  { name: "PHP", level: 75 },
  { name: "Canva", level: 70 },
  { name: "Javascript", level: 85 },
  { name: "Capcut", level: 65 },
];

export function TechStackSection() {
  // Split into 3 columns
  const column1 = techStack.slice(0, 4);
  const column2 = techStack.slice(4, 8);
  const column3 = techStack.slice(8);

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
                className="flex items-center gap-3 rounded-full border border-border px-4 py-2"
              >
                <span className="text-sm font-medium flex-shrink-0 w-32 truncate">
                  {tech.name}
                </span>
                <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground"
                    style={{ width: `${tech.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
