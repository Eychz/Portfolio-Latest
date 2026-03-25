import { HeroSection } from "@/components/home/hero-section";
import { RecentWorkSection } from "@/components/home/recent-work-section";
import { ContactSection } from "@/components/home/contact-section";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <RecentWorkSection />
      <ContactSection />
      <Footer />
    </>
  );
}
