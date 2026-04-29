import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Guard: skip if env vars missing
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next()
  }

  const pathname = request.nextUrl.pathname
  const isPortal   = pathname.startsWith('/portal') || pathname.startsWith('/admin-portal')
  const isAuthPage = pathname.startsWith('/auth')

  // Only do auth work for routes that actually need it
  if (!isPortal && !isAuthPage) {
    return NextResponse.next()
  }

  try {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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

    const { data: { user } } = await supabase.auth.getUser()

    // Unauthenticated → redirect to login
    if (isPortal && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(url)
    }

    // Already logged in → redirect away from auth pages
    if (isAuthPage && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/portal'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch {
    // Never let middleware crash the whole site
    return NextResponse.next()
  }
}

// ✅ Only intercept portal and auth routes — nothing else
export const config = {
  matcher: ['/portal/:path*', '/admin-portal/:path*', '/auth/:path*'],
}
