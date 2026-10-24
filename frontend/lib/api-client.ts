import type { ApiErrorBody } from "@/lib/types"

/** Error thrown by `apiClient` with the API's message and field errors. */
export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: Record<string, string[]>
  ) {
    super(message)
  }
}

/**
 * Browser-side fetch helper. Requests go through the Next.js `/api` proxy so
 * the session cookie stays first-party and no CORS setup is needed.
 */
export async function apiClient<T>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init
  const res = await fetch(`/api${path}`, {
    ...rest,
    credentials: "same-origin",
    headers: {
      ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  })

  if (res.status === 204) return undefined as T

  const body = await res.json().catch(() => null)
  if (!res.ok) {
    const error = (body as ApiErrorBody | null)?.error
    throw new ApiClientError(res.status, error?.message ?? `Request failed (${res.status})`, error?.details)
  }
  return body as T
}

/** Tells Next.js to refresh cached public pages after content changes. */
export function revalidateContent() {
  return fetch("/api/revalidate", { method: "POST", credentials: "same-origin" }).catch(() => undefined)
}
