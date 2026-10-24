"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, Lock } from "lucide-react"
import { FormField } from "@/components/admin/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setSubmitting(true)
    setError(null)
    try {
      await login(String(form.get("email")), String(form.get("password")))
      const next = searchParams.get("next")
      // Only follow same-site admin paths to avoid open redirects
      router.replace(next?.startsWith("/admin") ? next : "/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" required autoComplete="username" autoFocus />
      </FormField>
      <FormField label="Password" htmlFor="password">
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </FormField>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full gap-2" disabled={submitting}>
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign in
      </Button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold">Admin sign in</h1>
          <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
