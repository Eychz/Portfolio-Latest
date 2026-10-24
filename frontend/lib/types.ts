export type ProjectType = "SYSTEM" | "GRAPHIC_DESIGN" | "EVENT_PRODUCTION"
export type CertificateCategory = "CERTIFICATE" | "ACADEMIC_RECORD"

export interface Project {
  id: string
  slug: string
  type: ProjectType
  title: string
  description: string | null
  categories: string[]
  image: string | null
  link: string | null
  featured: boolean
  published: boolean
  sortOrder: number
}

export interface Certificate {
  id: string
  slug: string
  title: string
  image: string
  category: CertificateCategory
  published: boolean
  sortOrder: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: "ADMIN"
}

export interface DashboardStats {
  projects: { total: number; byType: Partial<Record<ProjectType, number>> }
  certificates: number
  unreadMessages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: { page: number; pageSize: number; total: number; totalPages: number }
}

export interface ApiErrorBody {
  error: { message: string; details?: Record<string, string[]> }
}
