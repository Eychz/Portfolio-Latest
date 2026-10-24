import type { NextRequest } from "next/server"
import { BACKEND_URL } from "@/lib/env"

/**
 * Forwards /api/* to the Express backend so the browser only ever talks to
 * this origin. Cookies (the admin session) pass through in both directions.
 */
const FORWARDED_REQUEST_HEADERS = ["accept", "authorization", "content-type", "cookie", "user-agent"]
const DROPPED_RESPONSE_HEADERS = ["connection", "content-encoding", "content-length", "transfer-encoding"]

async function proxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const target = `${BACKEND_URL}/api/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`

  const headers = new Headers()
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }
  const clientIp = request.headers.get("x-forwarded-for")
  if (clientIp) headers.set("x-forwarded-for", clientIp)

  let upstream: Response
  try {
    upstream = await fetch(target, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    })
  } catch {
    return Response.json({ error: { message: "API is unavailable. Please try again later." } }, { status: 502 })
  }

  const responseHeaders = new Headers(upstream.headers)
  for (const name of DROPPED_RESPONSE_HEADERS) responseHeaders.delete(name)

  return new Response(upstream.status === 204 ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  })
}

export { proxy as DELETE, proxy as GET, proxy as PATCH, proxy as POST, proxy as PUT }
