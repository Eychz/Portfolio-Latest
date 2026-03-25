import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GrabIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.703c-.185.266-.578.349-.878.185l-4.453-2.668c-.217-.13-.349-.366-.349-.62V6.891c0-.415.336-.75.75-.75s.75.335.75.75v7.266l4.002 2.398c.299.18.399.553.218.852l-.04.296z" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-3xl bg-foreground p-8 md:p-12 lg:p-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background">
          Hi, I&apos;m Harold Catipay.
        </h1>
        <p className="mt-2 text-xl md:text-2xl lg:text-3xl text-muted-foreground">
          Graphic Designer,
          <br />
          Event Production &
          <br />
          Developer.
        </p>

        {/* Decorative lines */}
        <div className="mt-8 space-y-2">
          <div className="h-0.5 w-full max-w-md bg-muted-foreground/50" />
          <div className="h-0.5 w-3/4 max-w-xs bg-muted-foreground/50" />
          <div className="h-0.5 w-full max-w-sm bg-muted-foreground/50" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            className="gap-2 bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <div className="h-8 w-px bg-muted-foreground/30" />

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-background text-foreground hover:bg-background/90 transition-colors"
            >
              <LinkedInIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-background text-foreground hover:bg-background/90 transition-colors"
            >
              <GrabIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
