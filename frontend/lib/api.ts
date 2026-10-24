import { certificates as fallbackCertificates } from "@/data/certificates"
import { projects as fallbackProjects } from "@/data/projects"
import { BACKEND_URL } from "@/lib/env"
import type { Certificate, CertificateCategory, PaginatedResponse, Project, ProjectType } from "@/lib/types"

/**
 * Server-side data access for public pages. Responses are cached by Next.js
 * for REVALIDATE_SECONDS (on top of the API's Redis cache). If the API is
 * unreachable, pages fall back to the bundled content in /data so the site
 * still renders.
 */
const REVALIDATE_SECONDS = 60

class NotFoundError extends Error {}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}/api${path}`, {
    next: { revalidate: REVALIDATE_SECONDS, tags: ["content"] },
  })
  if (res.status === 404) throw new NotFoundError(path)
  if (!res.ok) throw new Error(`API ${path} responded with ${res.status}`)
  return res.json() as Promise<T>
}

async function withFallback<T>(load: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await load()
  } catch (error) {
    if (error instanceof NotFoundError) throw error
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[api] ${(error as Error).message}; using bundled content`)
    }
    return fallback()
  }
}

async function orNull<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise
  } catch (error) {
    if (error instanceof NotFoundError) return null
    throw error
  }
}

interface ProjectFilters {
  type?: ProjectType
  featured?: boolean
}

export function getProjects(filters: ProjectFilters = {}): Promise<Project[]> {
  const params = new URLSearchParams({ pageSize: "100" })
  if (filters.type) params.set("type", filters.type)
  if (filters.featured !== undefined) params.set("featured", String(filters.featured))

  return withFallback(
    async () => (await apiGet<PaginatedResponse<Project>>(`/projects?${params}`)).data,
    () =>
      fallbackProjects.filter(
        (p) =>
          (!filters.type || p.type === filters.type) &&
          (filters.featured === undefined || p.featured === filters.featured)
      )
  )
}

export function getProjectBySlug(slug: string): Promise<Project | null> {
  return orNull(
    withFallback(
      async () => (await apiGet<{ data: Project }>(`/projects/${encodeURIComponent(slug)}`)).data,
      () => {
        const project = fallbackProjects.find((p) => p.slug === slug)
        if (!project) throw new NotFoundError(slug)
        return project
      }
    )
  )
}

export function getCertificates(category?: CertificateCategory): Promise<Certificate[]> {
  const params = new URLSearchParams({ pageSize: "100" })
  if (category) params.set("category", category)

  return withFallback(
    async () => (await apiGet<PaginatedResponse<Certificate>>(`/certificates?${params}`)).data,
    () => fallbackCertificates.filter((c) => !category || c.category === category)
  )
}

export function getCertificateBySlug(slug: string): Promise<Certificate | null> {
  return orNull(
    withFallback(
      async () => (await apiGet<{ data: Certificate }>(`/certificates/${encodeURIComponent(slug)}`)).data,
      () => {
        const certificate = fallbackCertificates.find((c) => c.slug === slug)
        if (!certificate) throw new NotFoundError(slug)
        return certificate
      }
    )
  )
}
