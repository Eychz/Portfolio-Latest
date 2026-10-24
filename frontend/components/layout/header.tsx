"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { navItems, siteConfig } from "@/data/site";

const navIcons = { "/": Home, "/about": User, "/projects": ArrowRight } as const;

// Sub-pages that should highlight a top-level nav item
const sectionPrefixes: Record<string, string[]> = {
  "/about": ["/about", "/certificates"],
  "/projects": ["/projects", "/system-projects", "/graphic-designs"],
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return (sectionPrefixes[href] ?? [href]).some((prefix) => pathname.startsWith(prefix));
}

export function Header() {
  const pathname = usePathname();


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background text-sm font-bold">
            HC
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{siteConfig.name}</p>
            <p className="text-xs text-muted-foreground">My Portfolio</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 rounded-lg border border-border p-1">
          {navItems.map((item) => {
            const Icon = navIcons[item.href];
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="gap-2 flex items-center">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Hire Me Button */}
          <Button variant="outline" className="gap-2" asChild>
            <Link href={`mailto:${siteConfig.email}`} aria-label="Contact Me">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact Me</span>
            </Link>
          </Button>
        </div>

      </div>
    </header>
  );
}
