export function ProjectShowcase() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-xl bg-foreground p-8 md:p-12 lg:p-6 gap-2">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold italic text-background">
          Project Showcase
        </h1>
        { /* Description */}
        <p className="text-center text-muted-foreground mt-5">
          Explore the projects I've worked on, from academic projects to personal projects.
        </p>
      </div>
    </section>
  );
}
