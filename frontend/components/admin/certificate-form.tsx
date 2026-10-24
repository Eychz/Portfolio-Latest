"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Checkbox, FormField, selectClassName } from "@/components/admin/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ApiClientError, apiClient, revalidateContent } from "@/lib/api-client"
import type { Certificate, CertificateCategory } from "@/lib/types"

export const certificateCategoryLabels: Record<CertificateCategory, string> = {
  CERTIFICATE: "Certificate",
  ACADEMIC_RECORD: "Academic record",
}

interface CertificateFormProps {
  certificate?: Certificate
  onSaved: () => void
  onCancel: () => void
}

export function CertificateForm({ certificate, onSaved, onCancel }: CertificateFormProps) {
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
      title: text("title"),
      image: text("image"),
      category: text("category") as CertificateCategory,
      published: form.get("published") === "on",
      sortOrder: Number(text("sortOrder") || 0),
    }

    setSaving(true)
    setErrors({})
    setFormError(null)
    try {
      await apiClient(certificate ? `/admin/certificates/${certificate.id}` : "/admin/certificates", {
        method: certificate ? "PATCH" : "POST",
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
      <h2 className="text-lg font-semibold">{certificate ? `Edit "${certificate.title}"` : "New certificate"}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Title" htmlFor="title" error={errors.title}>
          <Input id="title" name="title" required defaultValue={certificate?.title} />
        </FormField>
        <FormField label="Slug" htmlFor="slug" error={errors.slug} hint="Leave empty to generate from the title">
          <Input id="slug" name="slug" defaultValue={certificate?.slug} />
        </FormField>
        <FormField label="Image" htmlFor="image" error={errors.image} hint="Path in /public (e.g. /Certificates/my-cert.webp) or an https URL">
          <Input id="image" name="image" required defaultValue={certificate?.image} />
        </FormField>
        <FormField label="Category" htmlFor="category" error={errors.category}>
          <select id="category" name="category" className={selectClassName} defaultValue={certificate?.category ?? "CERTIFICATE"}>
            {Object.entries(certificateCategoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Sort order" htmlFor="sortOrder" error={errors.sortOrder} hint="Lower numbers show first">
          <Input id="sortOrder" name="sortOrder" type="number" min={0} defaultValue={certificate?.sortOrder ?? 0} />
        </FormField>
        <div className="flex items-center pt-6">
          <Checkbox id="published" name="published" label="Published" defaultChecked={certificate?.published ?? true} />
        </div>
      </div>

      {formError && <p className="text-sm text-destructive">{formError}</p>}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving} className="gap-2">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {certificate ? "Save changes" : "Create certificate"}
        </Button>
      </div>
    </form>
  )
}
