import type { Metadata } from "next"
import { AcademicSection } from "@/components/about/academic-section"
import { ProfileSection } from "@/components/about/profile-section"
import { TechStackSection } from "@/components/about/tech-stack-section"
import { getCertificates } from "@/lib/api"

export const metadata: Metadata = { title: "About" }

export default async function AboutPage() {
  const certificates = await getCertificates()

  return (
    <>
      <ProfileSection certificates={certificates} />
      <AcademicSection />
      <TechStackSection />
    </>
  )
}
