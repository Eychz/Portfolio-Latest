export function ProjectShowcase() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-3xl bg-foreground p-8 md:p-12 lg:p-16">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold italic text-background">
          Project Showcase
        </h1>

        {/* Decorative lines */}
        <div className="mt-8 flex flex-col items-center space-y-2">
          <div className="h-0.5 w-48 bg-muted-foreground/50" />
          <div className="h-0.5 w-64 bg-muted-foreground/50" />
          <div className="h-0.5 w-56 bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}
