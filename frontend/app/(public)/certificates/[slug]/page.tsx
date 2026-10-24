import type { Metadata } from "next";
import Image from "next/image";
import { Award, Image as ImageIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";
import { getCertificateBySlug, getCertificates } from "@/lib/api";
import { isRemoteImage } from "@/utils/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const certificates = await getCertificates();
  return certificates.map((certificate) => ({ slug: certificate.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cert = await getCertificateBySlug((await params).slug);
  return cert ? { title: cert.title, openGraph: { images: [cert.image] } } : {};
}

export default async function CertificateDetailsPage({ params }: Props) {
  const cert = await getCertificateBySlug((await params).slug);

  if (!cert) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 animate-in fade-in zoom-in-95 duration-500">
      <BackButton label="Back to Gallery" />

      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden glass-card border flex flex-col shadow-2xl bg-card">
        <div className="w-full bg-muted/50 relative flex justify-center items-center py-12 px-4 md:p-16 border-b border-border">
          <Image
            src={cert.image}
            alt={cert.title}
            unoptimized={isRemoteImage(cert.image)}
            width={2000}
            height={1500}
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
            className="w-auto max-w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-border" 
          />
        </div>
        
        <div className="p-8 md:p-12 bg-background flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div>
             <div className="flex items-center gap-2 mb-3">
               <Award className="h-5 w-5 text-primary" />
               <span className="text-sm font-semibold text-primary uppercase tracking-widest">Certificate</span>
             </div>
             <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">{cert.title}</h1>
          </div>
          
          <a 
            href={cert.image} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <ImageIcon className="h-4 w-4" /> View Full Original
          </a>
        </div>
      </div>
    </div>
  );
}
