"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Cpu, Shield, Wifi, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = ["Education", "Science", "Security", "Robotics"];

const projects = [
  { icon: Shield, category: "Security", title: "CyberShield VPN Client" },
  { icon: Cpu, category: "Security", title: "CyberShield VPN Client" },
  { icon: Wifi, category: "Security", title: "CyberShield VPN Client" },
  { icon: Bot, category: "Security", title: "CyberShield VPN Client" },
  { icon: Shield, category: "Security", title: "CyberShield VPN Client" },
  { icon: Cpu, category: "Security", title: "CyberShield VPN Client" },
  { icon: Wifi, category: "Security", title: "CyberShield VPN Client" },
  { icon: Bot, category: "Security", title: "CyberShield VPN Client" },
];

export function SystemProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">System Projects</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-full"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className="cursor-pointer rounded-full px-4 py-1"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <Card key={index} className="rounded-2xl border-2">
              <CardContent className="p-4">
                {/* Icon */}
                <div className="aspect-square flex items-center justify-center rounded-xl border-2 border-border mb-3">
                  <Icon className="h-12 w-12 text-muted-foreground" strokeWidth={1} />
                </div>

                {/* Category */}
                <span className="text-xs font-medium text-muted-foreground underline">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="font-bold text-sm mt-1">{project.title}</h3>

                {/* CTA */}
                <Link
                  href="#"
                  className="mt-3 inline-flex items-center gap-1 text-xs bg-foreground text-background px-2 py-1 rounded"
                >
                  View Full Details
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-foreground" />
      </div>
    </section>
  );
}
