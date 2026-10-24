"use client"

import { Mail, MailOpen, Reply, Trash2 } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"
import { Button } from "@/components/ui/button"
import { useApiResource } from "@/hooks/use-api-resource"
import { apiClient } from "@/lib/api-client"
import { cn } from "@/lib/utils"
import type { ContactMessage, PaginatedResponse } from "@/lib/types"
import { formatDate } from "@/utils/format"

export default function AdminMessagesPage() {
  const { data, error, loading, reload } = useApiResource<PaginatedResponse<ContactMessage>>(
    "/admin/messages?pageSize=100"
  )

  async function toggleRead(message: ContactMessage) {
    await apiClient(`/admin/messages/${message.id}`, { method: "PATCH", json: { read: !message.read } })
    await reload()
  }

  async function handleDelete(message: ContactMessage) {
    if (!window.confirm(`Delete the message from ${message.name}?`)) return
    await apiClient(`/admin/messages/${message.id}`, { method: "DELETE" })
    await reload()
  }

  return (
    <>
      <PageHeader title="Messages" description="Sent from the contact form on your site" />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {loading && !data && <p className="text-sm text-muted-foreground">Loading…</p>}
      {data && data.data.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}

      <ul className="space-y-3">
        {data?.data.map((message) => (
          <li
            key={message.id}
            className={cn("rounded-xl border border-border p-4", !message.read && "border-l-4 border-l-foreground")}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{message.name}</p>
                <p className="text-xs text-muted-foreground">
                  {message.email} · {formatDate(message.createdAt)}
                </p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${message.email}`} aria-label={`Reply to ${message.name}`}>
                    <Reply className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={message.read ? "Mark as unread" : "Mark as read"}
                  onClick={() => toggleRead(message)}
                >
                  {message.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete message" onClick={() => handleDelete(message)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <p className="mt-3 text-sm whitespace-pre-wrap">{message.message}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
