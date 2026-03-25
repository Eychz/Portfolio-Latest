import Link from "next/link";
import { Card } from "../ui/card";

const recentWorks = [
  { id: 1, title: "Project 1" },
  { id: 2, title: "Project 2" },
  { id: 3, title: "Project 3" },
  { id: 4, title: "Project 4" },
];

export function RecentWorkSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-2">
        <h2 className="text-2xl md:text-3xl font-bold">Recent Work</h2>
        <p className="text-sm text-muted-foreground">
          A quick look at what I've been building lately.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {recentWorks.map((work) => (
          <Card key={work.id} className="rounded-2xl border-2">
            <div className="p-4">
              <h3 className="font-bold">{work.title}</h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
