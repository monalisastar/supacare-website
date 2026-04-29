import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ROLE_HOME: Record<string, string> = {
  admin:      '/portal/admin',
  supervisor: '/portal/supervisor',
  enumerator: '/portal/enumerator',
  client:     '/portal/client',
}

const STAFF_ROLES = ['admin', 'supervisor', 'enumerator']

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code  = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(error)}`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`)
  }

  const supabase = await createClient()

  // Exchange code for session
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
  if (exchangeError) {
    return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(exchangeError.message)}`)
  }

  // Get the authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(`${origin}/auth/login?error=no_user`)
  }

  // Look up their profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, allow_google_auth, is_active')
    .eq('id', user.id)
    .single()

  // Block staff trying to use Google OAuth without permission
  if (profile && STAFF_ROLES.includes(profile.role) && !profile.allow_google_auth) {
    await supabase.auth.signOut()
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(
        'Staff accounts must sign in with email and password. Contact your admin if you need Google access.'
      )}`
    )
  }

  // Block inactive accounts
  if (profile && !profile.is_active) {
    await supabase.auth.signOut()
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent('Your account is inactive. Contact Supacare admin.')}`
    )
  }

  // Redirect to the right portal based on role
  const role     = profile?.role ?? 'client'
  const redirect = ROLE_HOME[role] ?? '/portal/client'

  return NextResponse.redirect(`${origin}${redirect}`)
}
