import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left Column - Profile Image & Student Info */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="aspect-square w-full max-w-[280px] mx-auto lg:mx-0 rounded-3xl bg-muted overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-foreground/20" />
            </div>
          </div>

          {/* Student Information Card */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="text-sm text-muted-foreground underline">
                  Student ID
                </span>
                <span className="text-sm underline">2021-04592</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="text-sm text-muted-foreground underline">
                  Program
                </span>
                <span className="text-sm underline">BS Info Tech</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground underline">
                  Standing
                </span>
                <span className="text-sm underline">Final Year</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - About & Projects */}
        <div className="space-y-8">
          {/* About Myself */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">About Myself</h1>
            <div className="mt-4 space-y-2">
              <div className="h-0.5 w-full max-w-md bg-border" />
              <div className="h-0.5 w-3/4 max-w-xs bg-border" />
              <div className="h-0.5 w-full max-w-sm bg-border" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-0.5 w-full max-w-lg bg-border" />
              <div className="h-0.5 w-2/3 max-w-sm bg-border" />
              <div className="h-0.5 w-full max-w-md bg-border" />
              <div className="h-0.5 w-3/4 max-w-xs bg-border" />
            </div>
          </div>

          {/* Project Highlights */}
          <div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-foreground" />
              <h2 className="text-lg font-semibold">Project Highlights</h2>
            </div>

            <div className="mt-4 flex gap-4">
              <div className="aspect-[4/5] w-40 rounded-xl border-2 border-border bg-background" />
              <div className="aspect-[4/5] w-40 rounded-xl border-2 border-border bg-background" />
            </div>

            <Link
              href="/projects"
              className="mt-4 inline-flex items-center gap-2 text-sm hover:underline"
            >
              View detailed project breakdown
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
