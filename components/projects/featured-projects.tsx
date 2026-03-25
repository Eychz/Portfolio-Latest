import Link from "next/link";
import { ArrowRight, Computer, ExternalLink, Cpu, Shield, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const featuredProjects = [
  {
    icon: Shield,
    category: "Security",
    title: "CyberShield VPN Client",
    description:
      "Academic project focused on implementing WireGuard protocols with a custom Electron GUI.",
  },
  {
    icon: Cpu,
    category: "Security",
    title: "CyberShield VPN Client",
    description:
      "Academic project focused on implementing WireGuard protocols with a custom Electron GUI.",
  },
  {
    icon: Wifi,
    category: "Security",
    title: "CyberShield VPN Client",
    description:
      "Academic project focused on implementing WireGuard protocols with a custom Electron GUI.",
  },
];

export function FeaturedProjects() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {featuredProjects.map((project, index) => {
          const Icon = project.icon;
          return (
            <Card key={index} className="rounded-2xl border-2">
              <CardContent className="p-6">
                {/* Icon */}
                <div className="aspect-[4/3] flex items-center justify-center rounded-xl border-2 border-border mb-4">
                  <Icon className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
                </div>

                {/* Category & Links */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground underline">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      <Computer className="h-4 w-4" />
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold">{project.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.description}
                </p>

                {/* CTA */}
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-xs bg-foreground text-background px-2 py-1 rounded"
                >
                  Full Case Study
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
