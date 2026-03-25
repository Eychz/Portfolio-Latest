"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/projects", label: "Projects", icon: ArrowRight },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background text-sm font-bold">
            HC
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Harold Catipay</p>
            <p className="text-xs text-muted-foreground">My Portfolio</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 rounded-lg border border-border p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
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

        {/* Hire Me Button */}
        <Button variant="outline" className="gap-2" asChild>
          <Link href="mailto:contact@haroldcatipay.com">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Hire Me</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
