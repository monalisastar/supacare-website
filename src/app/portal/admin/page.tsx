import { createClient } from '@/lib/supabase/server'
import {
  ClipboardList, Users, ShieldCheck, CheckCircle2,
  XCircle, Clock, Award, Globe, TrendingUp,
} from 'lucide-react'

// ── tiny stat card ────────────────────────────────────────────────────────────
function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  color = 'green',
}: {
  icon: any
  label: string
  value: string | number
  sub?: string
  color?: 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'gray'
}) {
  const palette: Record<string, string> = {
    green:  'bg-green-50 text-green-600',
    blue:   'bg-blue-50 text-blue-600',
    amber:  'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    red:    'bg-red-50 text-red-600',
    gray:   'bg-gray-100 text-gray-500',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${palette[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    submitted:    'bg-blue-100 text-blue-700',
    under_review: 'bg-amber-100 text-amber-700',
    approved:     'bg-green-100 text-green-700',
    rejected:     'bg-red-100 text-red-700',
    draft:        'bg-gray-100 text-gray-600',
    synced:       'bg-green-100 text-green-700',
  }
  const cls = map[status] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function AdminDashboard() {
  const supabase = await createClient()

  // ── parallel queries ───────────────────────────────────────────────────────
  const [
    { count: totalSurveys },
    { count: pendingReview },
    { count: approved },
    { count: rejected },
    { count: activeStaff },
    { data: recentSurveys },
    { data: periods },
    { data: creditRows },
  ] = await Promise.all([
    supabase.from('surveys').select('*', { count: 'exact', head: true }),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .in('status', ['submitted', 'under_review']),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .eq('status', 'approved'),
    supabase.from('surveys').select('*', { count: 'exact', head: true })
      .eq('status', 'rejected'),
    supabase.from('profiles').select('*', { count: 'exact', head: true })
      .eq('is_active', true).neq('role', 'client'),
    supabase.from('surveys')
      .select('id, household_id, status, monitoring_period, created_at, profiles(name)')
      .order('created_at', { ascending: false })
      .limit(8),
    supabase.from('monitoring_periods')
      .select('id, label, is_active, start_date, end_date')
      .order('start_date', { ascending: false })
      .limit(5),
    supabase.from('surveys')
      .select('carbon_credits_kg')
      .eq('status', 'approved')
      .not('carbon_credits_kg', 'is', null),
  ])

  const totalCreditsKg = (creditRows ?? []).reduce(
    (sum: number, r: any) => sum + (r.carbon_credits_kg ?? 0), 0,
  )
  const totalCreditsTonnes = (totalCreditsKg / 1000).toFixed(2)
  const approvalRate = totalSurveys
    ? Math.round(((approved ?? 0) / (totalSurveys ?? 1)) * 100)
    : 0

  const activePeriod = (periods ?? []).find((p: any) => p.is_active)

  return (
    <div className="p-6 space-y-8 max-w-7xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          GS4GG Kenya — Gold Standard Waste Management MRV
          {activePeriod && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Active period: {activePeriod.label}
            </span>
          )}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={ClipboardList} label="Total Surveys"  value={totalSurveys ?? 0}      color="blue"   />
        <KpiCard icon={Clock}         label="Pending Review" value={pendingReview ?? 0}      color="amber"
          sub="submitted + under review" />
        <KpiCard icon={CheckCircle2}  label="Approved"       value={approved ?? 0}           color="green"
          sub={`${approvalRate}% approval rate`} />
        <KpiCard icon={XCircle}       label="Rejected"       value={rejected ?? 0}           color="red"   />
        <KpiCard icon={Users}         label="Active Staff"   value={activeStaff ?? 0}        color="purple"
          sub="enumerators + supervisors" />
        <KpiCard icon={Award}         label="Carbon Credits" value={`${totalCreditsTonnes} t`} color="green"
          sub="approved surveys only" />
        <KpiCard icon={TrendingUp}    label="Approval Rate"  value={`${approvalRate}%`}      color="blue"  />
        <KpiCard icon={Globe}         label="MRV Periods"    value={(periods ?? []).length}  color="gray"  />
      </div>

      {/* Bottom two-col */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent surveys */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Recent Surveys</h2>
            <a href="/portal/admin/surveys" className="text-xs text-green-600 hover:underline">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {(recentSurveys ?? []).length === 0 && (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">No surveys yet</p>
            )}
            {(recentSurveys ?? []).map((s: any) => (
              <div key={s.id} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    HH {s.household_id ?? '—'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(s.profiles as any)?.name ?? 'Unknown enumerator'}
                    {s.monitoring_period ? ` · ${s.monitoring_period}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={s.status} />
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {new Date(s.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MRV Periods sidebar */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">MRV Periods</h2>
            <a href="/portal/admin/periods" className="text-xs text-green-600 hover:underline">Manage →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {(periods ?? []).length === 0 && (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">No periods configured</p>
            )}
            {(periods ?? []).map((p: any) => (
              <div key={p.id} className="px-5 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.label}</p>
                  {p.start_date && (
                    <p className="text-xs text-gray-400">
                      {new Date(p.start_date).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}
                      {p.end_date ? ` – ${new Date(p.end_date).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}` : ''}
                    </p>
                  )}
                </div>
                {p.is_active && (
                  <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
