import type { Metadata } from "next"
import { AdminShell } from "@/components/admin/admin-shell"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  )
}
