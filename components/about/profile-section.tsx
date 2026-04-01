import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
const studentInfo = {
  studentID: "2023-0350",
  program: "BS Info Tech",
  standing: "3rd Year",
};

const aboutText = {
  paragraph1: "I am a passionate graphic designer, event producer, and aspiring web developer with a keen eye for visual aesthetics and user experience. With a background in multimedia design and event management, I have developed strong skills in creating compelling digital content and managing complex projects.",
  paragraph2: "Currently pursuing my degree in Information Technology, I am eager to expand my technical skills and combine my creative expertise with web development. I am committed to delivering high-quality work and constantly learning new technologies to stay competitive in the industry.",
};
import { certificates } from "@/components/Files/CertificatesData";

export function ProfileSection() {
  return (
    <section className="container mx-auto px-20 py-20">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left Column - Profile Image & Student Info */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="aspect-square w-full max-w-[280px] mx-auto lg:mx-0 rounded-2xl bg-muted overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 group cursor-pointer">
            <Image
              src="/Profilec.png"
              alt="Harold Catipay"
              width={1080}
              height={1080}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            />
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
                <span className="text-sm underline">{studentInfo.studentID}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="text-sm text-muted-foreground underline">
                  Program
                </span>
                <span className="text-sm underline">{studentInfo.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground underline">
                  Standing
                </span>
                <span className="text-sm underline">{studentInfo.standing}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - About & Projects */}
        <div className="space-y-8">
          {/* About Myself */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">About Myself</h1>
            <div className="mt-4">
              <p className="text-muted-foreground leading-relaxed">
                {aboutText.paragraph1}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {aboutText.paragraph2}
              </p>
            </div>
          </div>

          {/* Certificates */}
          <div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-foreground" />
              <h2 className="text-lg font-semibold">Certificates</h2>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {certificates.slice(0, 3).map((cert) => (
                <div key={cert.id} className="rounded-xl border-2 border-border overflow-hidden bg-muted relative group">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={700}
                    height={700}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}

              {certificates.length > 3 && (
                <Link href="/certificates" className="block relative rounded-xl border-2 border-border overflow-hidden bg-muted group cursor-pointer aspect-[4/5] shadow-sm hover:shadow-md transition-shadow">
                  {/* Piled up images background */}
                  <div className="absolute inset-0 overflow-hidden">
                    {certificates.slice(3, 6).map((cert, index) => (
                      <div
                        key={cert.id}
                        className="absolute inset-0 border border-border shadow-2xl transition-transform duration-500"
                        style={{
                          transform: `translateY(${index * 15}px) scale(${1 - index * 0.08})`,
                          zIndex: 10 - index,
                          opacity: 0.6 - (index * 0.15)
                        }}
                      >
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center z-20 group-hover:bg-background/50 transition-colors">
                    <span className="text-4xl md:text-3xl font-bold tracking-tighter mb-1">+{certificates.length - 3}</span>
                    <span className="text-xs md:text-sm font-semibold flex flex-col items-center justify-center gap-1 group-hover:underline">
                      View All Certificates
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
