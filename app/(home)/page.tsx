import { HeroSection } from "@/components/home/hero-section";
import { RecentWorkSection } from "@/components/home/recent-work-section";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RecentWorkSection />
      <ContactSection />
    </>
  );
}
