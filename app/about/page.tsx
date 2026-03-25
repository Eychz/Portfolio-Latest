import { ProfileSection } from "@/components/about/profile-section";
import { AcademicSection } from "@/components/about/academic-section";
import { TechStackSection } from "@/components/about/tech-stack-section";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <>
    <Header />
      <ProfileSection />
      <AcademicSection />
      <TechStackSection />
    <Footer />
    </>
  );
}
