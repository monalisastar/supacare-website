import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function PortalRouter() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role ?? 'client'

  switch (role) {
    case 'admin':
      redirect('/portal/admin')
    case 'supervisor':
      redirect('/portal/supervisor')
    case 'enumerator':
      redirect('/portal/enumerator')
    default:
      redirect('/portal/client')
  }
}
