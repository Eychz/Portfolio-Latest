"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Checkbox, FormField, selectClassName } from "@/components/admin/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ApiClientError, apiClient, revalidateContent } from "@/lib/api-client"
import type { Project, ProjectType } from "@/lib/types"
import { parseList } from "@/utils/format"
import { projectTypeMeta } from "@/utils/project"

interface ProjectFormProps {
  project?: Project
  onSaved: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSaved, onCancel }: ProjectFormProps) {
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = (name: string) => String(form.get(name) ?? "").trim()
    const slug = text("slug")

    const payload = {
      ...(slug ? { slug } : {}),
      type: text("type") as ProjectType,
      title: text("title"),
      description: text("description") || null,
      categories: parseList(text("categories")),
      image: text("image") || null,
      link: text("link") || null,
      featured: form.get("featured") === "on",
      published: form.get("published") === "on",
      sortOrder: Number(text("sortOrder") || 0),
    }

    setSaving(true)
    setErrors({})
    setFormError(null)
    try {
      await apiClient(project ? `/admin/projects/${project.id}` : "/admin/projects", {
        method: project ? "PATCH" : "POST",
        json: payload,
      })
      await revalidateContent()
      onSaved()
    } catch (error) {
      if (error instanceof ApiClientError && error.details) setErrors(error.details)
      setFormError(error instanceof Error ? error.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-4 md:p-6">
      <h2 className="text-lg font-semibold">{project ? `Edit "${project.title}"` : "New project"}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Title" htmlFor="title" error={errors.title}>
          <Input id="title" name="title" required defaultValue={project?.title} />
        </FormField>
        <FormField label="Slug" htmlFor="slug" error={errors.slug} hint="Leave empty to generate from the title">
          <Input id="slug" name="slug" defaultValue={project?.slug} placeholder="my-project" />
        </FormField>
        <FormField label="Type" htmlFor="type" error={errors.type}>
          <select id="type" name="type" className={selectClassName} defaultValue={project?.type ?? "GRAPHIC_DESIGN"}>
            {Object.entries(projectTypeMeta).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Categories" htmlFor="categories" error={errors.categories} hint="Comma-separated">
          <Input id="categories" name="categories" defaultValue={project?.categories.join(", ")} placeholder="Sportwear, Commission" />
        </FormField>
        <FormField label="Image" htmlFor="image" error={errors.image} hint="Path in /public (e.g. /Mockups/air-v1.webp) or an https URL">
          <Input id="image" name="image" defaultValue={project?.image ?? ""} />
        </FormField>
        <FormField label="Link" htmlFor="link" error={errors.link} hint="Live site or post URL">
          <Input id="link" name="link" type="url" defaultValue={project?.link ?? ""} placeholder="https://" />
        </FormField>
        <FormField label="Description" htmlFor="description" error={errors.description} className="md:col-span-2">
          <Textarea id="description" name="description" rows={4} defaultValue={project?.description ?? ""} />
        </FormField>
        <FormField label="Sort order" htmlFor="sortOrder" error={errors.sortOrder} hint="Lower numbers show first">
          <Input id="sortOrder" name="sortOrder" type="number" min={0} defaultValue={project?.sortOrder ?? 0} />
        </FormField>
        <div className="flex items-center gap-6 pt-6">
          <Checkbox id="featured" name="featured" label="Featured" defaultChecked={project?.featured ?? false} />
          <Checkbox id="published" name="published" label="Published" defaultChecked={project?.published ?? true} />
        </div>
      </div>

      {formError && <p className="text-sm text-destructive">{formError}</p>}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving} className="gap-2">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {project ? "Save changes" : "Create project"}
        </Button>
      </div>
    </form>
  )
}
