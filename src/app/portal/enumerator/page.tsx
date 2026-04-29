import { createClient } from '@/lib/supabase/server'
import { ClipboardList, CheckCircle2, Clock, BarChart3 } from 'lucide-react'
import Link from 'next/link'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    submitted:    'bg-blue-100 text-blue-700',
    under_review: 'bg-amber-100 text-amber-700',
    approved:     'bg-green-100 text-green-700',
    rejected:     'bg-red-100 text-red-700',
    draft:        'bg-gray-100 text-gray-600',
    synced:       'bg-green-100 text-green-700',
  }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

export default async function EnumeratorDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { data: mySurveys },
    { count: total },
    { count: submitted },
    { count: approved },
  ] = await Promise.all([
    supabase.from('surveys')
      .select('id, household_id, status, monitoring_period, created_at, county')
      .eq('enumerator_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .eq('enumerator_id', user!.id),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .eq('enumerator_id', user!.id).in('status', ['submitted', 'under_review']),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .eq('enumerator_id', user!.id).eq('status', 'approved'),
  ])

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Surveys</h1>
        <p className="text-sm text-gray-500 mt-0.5">Surveys you have submitted via the mobile app</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: ClipboardList, label: 'Total Submitted', value: total ?? 0, color: 'blue' },
          { icon: Clock,         label: 'Under Review',    value: submitted ?? 0, color: 'amber' },
          { icon: CheckCircle2,  label: 'Approved',        value: approved ?? 0, color: 'green' },
        ].map(({ icon: Icon, label, value, color }) => {
          const palette: Record<string, string> = {
            blue: 'bg-blue-50 text-blue-600', amber: 'bg-amber-50 text-amber-600', green: 'bg-green-50 text-green-600',
          }
          return (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${palette[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Survey list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Recent Surveys</h2>
          <Link href="/portal/enumerator/stats" className="text-xs text-green-600 hover:underline">My Stats →</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {(mySurveys ?? []).length === 0 && (
            <div className="px-5 py-12 text-center">
              <ClipboardList className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No surveys yet</p>
              <p className="text-xs text-gray-400 mt-1">Surveys you complete on the mobile app will appear here</p>
            </div>
          )}
          {(mySurveys ?? []).map((s: any) => (
            <div key={s.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">HH {s.household_id ?? '—'}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {s.monitoring_period ?? 'No period'} · {s.county ?? '—'}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <StatusBadge status={s.status} />
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
