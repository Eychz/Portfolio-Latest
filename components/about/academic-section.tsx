import { BookOpen, ChevronRight } from "lucide-react";
import { education } from "@/components/Files/AcademicData";

export function AcademicSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8" />
        <h2 className="text-3xl md:text-4xl font-bold">Academic Information</h2>
      </div>

      <div className="w-full pb-10 mt-8">
        {/* Education Timeline */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 w-full relative">
          {[...education].reverse().map((item, index, array) => (
            <div key={index} className="flex-1 relative group flex md:flex-col gap-2 md:gap-4">

              {/* Timeline Line/Dots */}
              <div className="flex md:flex-row flex-col items-center relative md:mt-0 ml-4 md:ml-0">
                {/* Dot */}
                <div className="relative z-10 flex items-center justify-center bg-background p-1 mt-1 md:mt-0">
                  <span className="h-4 w-4 rounded-full bg-primary shadow-sm group-hover:scale-[1.3] transition-transform shrink-0" />
                </div>

                {/* Mobile vertical line */}
                {index !== array.length - 1 && (
                  <div className="md:hidden absolute top-6 w-[2px] h-[100%] bg-border group-hover:bg-primary/40 transition-colors z-0 flex flex-col justify-end items-center">
                    <ChevronRight className="h-4 w-4 text-border group-hover:text-primary/40 transition-colors rotate-90 translate-y-3 group-hover:translate-y-4" />
                  </div>
                )}

                {/* Desktop horizontal line */}
                {index !== array.length - 1 && (
                  <div className="hidden md:flex items-center w-[calc(100%-8px)] absolute left-6 z-0">
                    <div className="w-full h-[2px] bg-border group-hover:bg-primary/40 transition-colors" />
                    <ChevronRight className="h-5 w-5 text-border group-hover:text-primary/40 transition-all absolute -right-4 group-hover:translate-x-1" />
                  </div>
                )}
              </div>

              {/* Content Box */}
              <div className="pb-6 md:pb-0 md:pr-4 transition-transform duration-300">
                <div className="p-4 sm:p-5 rounded-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-card/40 group-hover:shadow-lg border border-transparent group-hover:border-primary/20 h-full">
                  <p className="text-sm font-bold text-primary tracking-widest mb-1.5 group-hover:opacity-80 transition-opacity">{item.years}</p>
                  <p className="text-xl lg:text-3xl font-extrabold tracking-tight mb-2 leading-tight group-hover:text-primary transition-colors">{item.degree}</p>
                  <p className="text-base lg:text-lg text-muted-foreground">{item.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
