import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-3xl bg-foreground p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-background/10">
            <Mail className="h-8 w-8 text-background" />
          </div>

          <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold text-background">
            Have a project in mind?
          </h2>

          {/* Decorative lines */}
          <div className="mt-6 w-full max-w-md space-y-2">
            <div className="mx-auto h-0.5 w-full bg-muted-foreground/30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, currentColor 4px, currentColor 8px)' }} />
            <div className="mx-auto h-0.5 w-3/4 bg-muted-foreground/50" />
            <div className="mx-auto h-0.5 w-full bg-muted-foreground/50" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              className="gap-2 bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link href="mailto:contact@haroldcatipay.com">
                Send an Email
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="gap-2 bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link href="#">
                Visit Facebook
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
