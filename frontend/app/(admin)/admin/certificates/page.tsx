"use client"

import { useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { CertificateForm, certificateCategoryLabels } from "@/components/admin/certificate-form"
import { PageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { useApiResource } from "@/hooks/use-api-resource"
import { apiClient, revalidateContent } from "@/lib/api-client"
import type { Certificate, PaginatedResponse } from "@/lib/types"

type Editing = { mode: "create" } | { mode: "edit"; certificate: Certificate } | null

export default function AdminCertificatesPage() {
  const { data, error, loading, reload } = useApiResource<PaginatedResponse<Certificate>>(
    "/admin/certificates?pageSize=100"
  )
  const [editing, setEditing] = useState<Editing>(null)

  async function handleDelete(certificate: Certificate) {
    if (!window.confirm(`Delete "${certificate.title}"? This cannot be undone.`)) return
    await apiClient(`/admin/certificates/${certificate.id}`, { method: "DELETE" })
    await revalidateContent()
    await reload()
  }

  async function togglePublished(certificate: Certificate) {
    await apiClient(`/admin/certificates/${certificate.id}`, {
      method: "PATCH",
      json: { published: !certificate.published },
    })
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
        title="Certificates"
        description={data ? `${data.meta.total} certificates` : undefined}
        action={
          <Button className="gap-2" onClick={() => setEditing({ mode: "create" })}>
            <Plus className="h-4 w-4" /> New certificate
          </Button>
        }
      />

      {editing && (
        <div className="mb-6">
          <CertificateForm
            key={editing.mode === "edit" ? editing.certificate.id : "new"}
            certificate={editing.mode === "edit" ? editing.certificate : undefined}
            onSaved={handleSaved}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && !data && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {data?.data.map((certificate) => (
              <tr key={certificate.id} className="border-t border-border">
                <td className="px-4 py-2 font-medium">{certificate.title}</td>
                <td className="px-4 py-2 whitespace-nowrap">{certificateCategoryLabels[certificate.category]}</td>
                <td className="px-4 py-2">
                  <button type="button" onClick={() => togglePublished(certificate)} title="Click to toggle">
                    <StatusBadge active={certificate.published} on="Published" off="Hidden" />
                  </button>
                </td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  <Button variant="ghost" size="icon" aria-label={`Edit ${certificate.title}`} onClick={() => setEditing({ mode: "edit", certificate })}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label={`Delete ${certificate.title}`} onClick={() => handleDelete(certificate)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
