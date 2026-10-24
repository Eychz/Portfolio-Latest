import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site"
import { getCertificates, getProjects } from "@/lib/api"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, certificates] = await Promise.all([getProjects(), getCertificates()])
  const url = (path: string) => `${siteConfig.url}${path}`

  const staticRoutes = ["", "/about", "/projects", "/system-projects", "/graphic-designs", "/certificates"].map(
    (path) => ({ url: url(path), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })
  )

  return [
    ...staticRoutes,
    ...projects.map((p) => ({ url: url(`/projects/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...certificates.map((c) => ({ url: url(`/certificates/${c.slug}`), changeFrequency: "yearly" as const, priority: 0.4 })),
  ]
}
