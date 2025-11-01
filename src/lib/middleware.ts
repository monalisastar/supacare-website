import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/dashboard/:path*"], // only protect dashboard routes
}

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: any } }) {
    const token = req.nextauth.token

    // ❌ No token = redirect to login
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // ✅ Allow everything else
    return NextResponse.next()
  },
  {
    callbacks: {
      // only allow if user has a token
      authorized: ({ token }) => !!token,
    },
  }
)
