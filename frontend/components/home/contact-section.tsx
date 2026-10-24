import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/home/contact-form";
import { siteConfig } from "@/data/site";

export function ContactSection() {
  return (
    <section id="contact" className="container mx-auto px-4 py-15">
      <div className="rounded-2xl h-full bg-foreground p-8 md:p-12 lg:p-16 flex items-center justify-center">
        <div className="flex w-full flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-background/10">
            <Mail className="h-12 w-12 text-background" />
          </div>

          <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-background">
            Have a project in mind?
          </h2>
          <p className="text-background max-w-2xl py-5">I&apos;m always open to new opportunities, collaborations, and interesting challenges. If you have a project in mind or just want to say hi, feel free to reach out!</p>

          <ContactForm />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant={"outline"}
              className="gap-2 bg-background text-foreground hover:bg-background/80"
              asChild
            >
              <Link href={`mailto:${siteConfig.email}`}>
                Send an Email
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant={"outline"}
              className="gap-2 bg-background text-foreground hover:bg-background/80"
              asChild
            >
              <Link href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer">
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
