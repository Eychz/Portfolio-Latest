"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { Award, ExternalLink, FolderKanban, LayoutDashboard, Loader2, LogOut, Mail } from "lucide-react"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/messages", label: "Messages", icon: Mail },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const isLoginPage = pathname === "/admin/login"
  const loggingOut = useRef(false)

  // A stale cookie gets past the route guard; send those visitors to log in again
  useEffect(() => {
    if (!loading && !user && !isLoginPage && !loggingOut.current) router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`)
  }, [loading, user, isLoginPage, pathname, router])

  if (isLoginPage) return <>{children}</>

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  async function handleLogout() {
    loggingOut.current = true
    await logout()
    router.replace("/admin/login")
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-border bg-muted/30 md:min-h-screen md:border-r md:border-b-0">
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
            HC
          </div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="max-w-[150px] truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:pb-0">
          {adminNav.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex h-14 items-center justify-end gap-2 border-b border-border px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" target="_blank" className="gap-2">
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
          </Button>
          <ModeToggle />
          <Button variant="outline" size="sm" className="gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
