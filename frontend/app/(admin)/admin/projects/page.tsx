"use client"

import { useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"
import { ProjectForm } from "@/components/admin/project-form"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApiResource } from "@/hooks/use-api-resource"
import { apiClient, revalidateContent } from "@/lib/api-client"
import type { PaginatedResponse, Project } from "@/lib/types"
import { projectTypeMeta } from "@/utils/project"

type Editing = { mode: "create" } | { mode: "edit"; project: Project } | null

export default function AdminProjectsPage() {
  const { data, error, loading, reload } = useApiResource<PaginatedResponse<Project>>("/admin/projects?pageSize=100")
  const [editing, setEditing] = useState<Editing>(null)
  const [search, setSearch] = useState("")

  const projects = (data?.data ?? []).filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

  async function handleDelete(project: Project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return
    await apiClient(`/admin/projects/${project.id}`, { method: "DELETE" })
    await revalidateContent()
    await reload()
  }

  async function handleSaved() {
    setEditing(null)
    await reload()
  }

  return (
    <>
      <PageHeader
        title="Projects"
        description={data ? `${data.meta.total} projects` : undefined}
        action={
          <Button className="gap-2" onClick={() => setEditing({ mode: "create" })}>
            <Plus className="h-4 w-4" /> New project
          </Button>
        }
      />

      {editing && (
        <div className="mb-6">
          <ProjectForm
            key={editing.mode === "edit" ? editing.project.id : "new"}
            project={editing.mode === "edit" ? editing.project : undefined}
            onSaved={handleSaved}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <Input
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-xs"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && !data && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Order</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-border">
                <td className="px-4 py-2">
                  <p className="font-medium">{project.title}</p>
                  <p className="text-xs text-muted-foreground">/{project.slug}</p>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{projectTypeMeta[project.type].label}</td>
                <td className="space-x-1 px-4 py-2 whitespace-nowrap">
                  <StatusBadge active={project.published} on="Published" off="Draft" />
                  {project.featured && <StatusBadge active on="Featured" off="" />}
                </td>
                <td className="px-4 py-2 tabular-nums">{project.sortOrder}</td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  <Button variant="ghost" size="icon" aria-label={`Edit ${project.title}`} onClick={() => setEditing({ mode: "edit", project })}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label={`Delete ${project.title}`} onClick={() => handleDelete(project)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {data && projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
