import { ContactSection } from "@/components/home/contact-section"
import { HeroSection } from "@/components/home/hero-section"
import { RecentWorkSection } from "@/components/home/recent-work-section"
import { PublicShell } from "@/components/layout/public-shell"
import { getProjects } from "@/lib/api"

export default async function HomePage() {
  const featured = await getProjects({ featured: true })

  return (
    <PublicShell>
      <HeroSection />
      <RecentWorkSection projects={featured} />
      <ContactSection />
    </PublicShell>
  )
}
