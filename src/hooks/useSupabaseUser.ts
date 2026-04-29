'use client'

/**
 * useSupabaseUser — returns the current Supabase user + their Supacare profile.
 * Use in client components to gate UI by role.
 *
 * profile.role: 'enumerator' | 'supervisor' | 'admin' | 'client'
 */

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface SupacareProfile {
  id: string
  name: string
  email: string
  role: 'enumerator' | 'supervisor' | 'admin' | 'client'
  staff_code?: string
  county?: string
  is_active: boolean
}

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<SupacareProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(data)
      }

      setLoading(false)
    }

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        if (!session?.user) setProfile(null)
        else loadUser()
      },
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, profile, loading }
}
