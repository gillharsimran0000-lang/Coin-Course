"use client"

// Backend — Auth state provider (session, user, sign out)

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User as SupabaseUser, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

export interface User {
  id: string
  name: string
  email: string
}

interface AuthCtx {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
})

function toUser(su: SupabaseUser): User {
  return {
    id: su.id,
    name:
      su.user_metadata?.full_name ??
      su.user_metadata?.name ??
      su.email?.split("@")[0] ??
      "Learner",
    email: su.email ?? "",
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session ? toUser(data.session.user) : null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession)
      setUser(newSession ? toUser(newSession.user) : null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
