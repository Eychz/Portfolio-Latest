import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"
import { BACKEND_URL } from "@/lib/env"

/** Refreshes cached public pages. Only signed-in admins may call it. */
export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") ?? ""
  const me = await fetch(`${BACKEND_URL}/api/auth/me`, { headers: { cookie }, cache: "no-store" }).catch(() => null)
  if (!me?.ok) {
    return Response.json({ error: { message: "Authentication required" } }, { status: 401 })
  }

  revalidatePath("/", "layout")
  return Response.json({ data: { revalidated: true } })
}
