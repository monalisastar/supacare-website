/**
 * Supabase middleware helper — refreshes the user session on every request
 * so Server Components always get a valid, non-expired token.
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Refresh session — do not remove this await
  const { data: { user } } = await supabase.auth.getUser()

  // ── Protected routes ────────────────────────────────────────────────────────
  const pathname = request.nextUrl.pathname
  const isPortal = pathname.startsWith('/portal') || pathname.startsWith('/admin-portal')
  const isAuthPage = pathname.startsWith('/auth')

  if (isPortal && !user) {
    // Not logged in → redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPage && user) {
    // Already logged in → redirect to appropriate portal
    const url = request.nextUrl.clone()
    url.pathname = '/portal'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
