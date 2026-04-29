import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PortalShell from '@/components/portal/PortalShell'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, email, role, staff_code, county, is_active')
    .eq('id', user.id)
    .single()

  return (
    <PortalShell profile={profile}>
      {children}
    </PortalShell>
  )
}
