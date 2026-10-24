"use client"

import Link from "next/link"
import { Award, FolderKanban, Mail, type LucideIcon } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"
import { useApiResource } from "@/hooks/use-api-resource"
import type { DashboardStats } from "@/lib/types"
import { projectTypeMeta } from "@/utils/project"

export default function AdminDashboardPage() {
  const { data, error, loading } = useApiResource<{ data: DashboardStats }>("/admin/stats")
  const stats = data?.data

  return (
    <>
      <PageHeader title="Dashboard" description="Overview of your portfolio content" />
      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard href="/admin/projects" icon={FolderKanban} label="Projects" value={stats?.projects.total} loading={loading} />
        <StatCard href="/admin/certificates" icon={Award} label="Certificates" value={stats?.certificates} loading={loading} />
        <StatCard href="/admin/messages" icon={Mail} label="Unread messages" value={stats?.unreadMessages} loading={loading} />
      </div>

      {stats && (
        <div className="mt-8 rounded-xl border border-border p-4">
          <h2 className="mb-3 text-sm font-semibold">Projects by type</h2>
          <ul className="space-y-2">
            {Object.entries(projectTypeMeta).map(([type, meta]) => (
              <li key={type} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <meta.icon className="h-4 w-4" /> {meta.label}
                </span>
                <span className="font-medium tabular-nums">
                  {stats.projects.byType[type as keyof typeof stats.projects.byType] ?? 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

function StatCard({
  href,
  icon: Icon,
  label,
  value,
  loading,
}: {
  href: string
  icon: LucideIcon
  label: string
  value?: number
  loading: boolean
}) {
  return (
    <Link href={href} className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-sm">{label}</span>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-2 text-3xl font-bold tabular-nums">{loading ? "–" : (value ?? 0)}</p>
    </Link>
  )
}
