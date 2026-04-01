import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { certificates } from "@/components/Files/CertificatesData";
import { BackButton } from "@/components/ui/back-button";

export default function CertificatesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <BackButton label="Back to About" />

      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Award className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Full Certificate Gallery</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {certificates.map((cert) => (
          <Link key={cert.id} href={`/certificates/${cert.slug}`} className="group block">
            <div className="flex flex-col h-full rounded-2xl border bg-card hover:bg-card/80 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] w-full bg-muted flex items-center justify-center p-4 border-b">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-md"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-xs text-muted-foreground mt-4 font-mono">View Details →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
