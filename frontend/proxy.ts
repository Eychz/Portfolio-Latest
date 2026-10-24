import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE } from "@/lib/env"

/**
 * Sends visitors without a session cookie to the admin login page. The API
 * still verifies the token on every request; this only avoids rendering
 * admin screens for signed-out users.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE)

  if (pathname === "/admin/login") {
    return hasSession ? NextResponse.redirect(new URL("/admin", request.url)) : NextResponse.next()
  }

  if (!hasSession) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
