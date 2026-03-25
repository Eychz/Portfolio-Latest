import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const education = [
  {
    years: "2021 - 2025",
    degree: "B.S. in Information Technology",
    school: "Global Tech University",
  },
  {
    years: "2019 - 2021",
    degree: "STEM Track - Senior High",
    school: "Science Academy",
  },
  {
    years: "2012- 2019",
    degree: "B.S. in Information Technology",
    school: "Global Tech University",
  },
];

const achievements = [
  { title: "CHAMPION | SCIENCE QUIZ BOWL" },
  { title: "CHAMPION | SCIENCE QUIZ BOWL" },
  { title: "CHAMPION | SCIENCE QUIZ BOWL" },
  { title: "CHAMPION | SCIENCE QUIZ BOWL" },
];

export function AcademicSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8" />
        <h2 className="text-3xl md:text-4xl font-bold">Academic Information</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Education Timeline */}
        <div className="space-y-6">
          {education.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.years}</p>
                <p className="font-semibold">{item.degree}</p>
                <p className="text-sm text-muted-foreground">{item.school}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Card */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">ACAD-chievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 h-full w-1 rounded-full bg-foreground" />
                <div>
                  <p className="text-sm font-medium">{achievement.title}</p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-xs bg-foreground text-background px-2 py-0.5 rounded mt-1"
                  >
                    View Certificate
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
