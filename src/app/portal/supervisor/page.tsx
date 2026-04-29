import { createClient } from '@/lib/supabase/server'
import { ShieldCheck, Clock, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

function KpiCard({ icon: Icon, label, value, color = 'blue' }: {
  icon: any; label: string; value: number | string; color?: string
}) {
  const palette: Record<string, string> = {
    blue:   'bg-blue-50 text-blue-600',
    amber:  'bg-amber-50 text-amber-600',
    green:  'bg-green-50 text-green-600',
    red:    'bg-red-50 text-red-600',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${palette[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  )
}

export default async function SupervisorDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { count: myPending },
    { count: myApproved },
    { count: myRejected },
    { data: queue },
  ] = await Promise.all([
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .in('status', ['submitted', 'under_review']),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .eq('status', 'approved'),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .eq('status', 'rejected'),
    supabase.from('surveys')
      .select('id, household_id, status, monitoring_period, created_at, county, profiles(name, staff_code)')
      .in('status', ['submitted', 'under_review'])
      .order('created_at', { ascending: true })
      .limit(10),
  ])

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Supervisor Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">MRV review queue — Gold Standard GS4GG Kenya</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard icon={Clock}        label="Awaiting Review" value={myPending ?? 0}  color="amber" />
        <KpiCard icon={CheckCircle2} label="Approved"        value={myApproved ?? 0} color="green" />
        <KpiCard icon={XCircle}      label="Rejected"        value={myRejected ?? 0} color="red"   />
      </div>

      {/* Review queue preview */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Review Queue</h2>
          <Link href="/portal/supervisor/review" className="text-xs text-green-600 hover:underline">
            Open full queue →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {(queue ?? []).length === 0 && (
            <p className="px-5 py-10 text-sm text-center text-gray-400">No surveys awaiting review</p>
          )}
          {(queue ?? []).map((s: any) => (
            <div key={s.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">HH {s.household_id ?? '—'}</p>
                <p className="text-xs text-gray-400">
                  {(s.profiles as any)?.name ?? 'Unknown'} · {s.monitoring_period ?? '—'} · {s.county ?? '—'}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'under_review' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {s.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(s.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
