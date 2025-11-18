import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/dashboard/:path*"], // protect dashboard routes
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

    // 🧭 Role-based redirect when accessing plain /dashboard
    const pathname = req.nextUrl.pathname

    if (pathname === "/dashboard") {
      const role = token.role || "client" // default fallback
      const url = req.nextUrl.clone()

      switch (role) {
        case "admin":
          url.pathname = "/dashboard/admin"
          break
        case "consultant":
          url.pathname = "/dashboard/consultant"
          break
        case "partner":
          url.pathname = "/dashboard/partner"
          break
        default:
          url.pathname = "/dashboard/client"
          break
      }

      return NextResponse.redirect(url)
    }

    // ✅ Allow all other dashboard subroutes
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)
