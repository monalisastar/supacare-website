// Shim replacing next-auth/react for legacy pages.
// Auth is now handled by Supabase — these pages are part of the old /dashboard
// and are not actively used in the new /portal flow.

export function useSession() {
  return { data: null, status: 'unauthenticated' as const }
}

export function signIn() {
  if (typeof window !== 'undefined') window.location.href = '/auth/login'
}

export function signOut() {
  if (typeof window !== 'undefined') window.location.href = '/auth/login'
}
