'use client'

import { signOut } from '@/lib/next-auth-shim'

export const handleLogout = async () => {
  try {
    // 1️⃣ Stop automatic redirect
    await signOut({ redirect: false })

    // 2️⃣ Manually clear all cookies
    document.cookie.split(';').forEach(c => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    })

    // 3️⃣ Clear session storage + localStorage (optional but safe)
    sessionStorage.clear()
    localStorage.clear()

    // 4️⃣ Redirect manually
    window.location.href = '/auth/login'
  } catch (err) {
    console.error('Logout error:', err)
  }
}
