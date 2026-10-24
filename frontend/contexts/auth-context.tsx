"use client"

import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { apiClient } from "@/lib/api-client"
import type { AdminUser } from "@/lib/types"

interface AuthContextValue {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient<{ data: AdminUser }>("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await apiClient("/auth/login", { method: "POST", json: { email, password } })
    const me = await apiClient<{ data: AdminUser }>("/auth/me")
    setUser(me.data)
  }, [])

  const logout = useCallback(async () => {
    await apiClient("/auth/logout", { method: "POST" }).catch(() => undefined)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
