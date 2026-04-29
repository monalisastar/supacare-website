import { createClient } from '@/lib/supabase/server'
import { BarChart3, Award, TrendingUp, Clock } from 'lucide-react'

export default async function EnumeratorStatsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, status, monitoring_period, carbon_credits_kg, created_at')
    .eq('enumerator_id', user!.id)
    .order('created_at', { ascending: false })

  const all = surveys ?? []
  const approved = all.filter(s => s.status === 'approved')
  const totalCreditsKg = approved.reduce((sum, s) => sum + (s.carbon_credits_kg ?? 0), 0)
  const approvalRate = all.length ? Math.round((approved.length / all.length) * 100) : 0

  // by period
  const byPeriod: Record<string, { total: number; approved: number }> = {}
  all.forEach(s => {
    const p = s.monitoring_period ?? 'Unassigned'
    if (!byPeriod[p]) byPeriod[p] = { total: 0, approved: 0 }
    byPeriod[p].total++
    if (s.status === 'approved') byPeriod[p].approved++
  })

  // monthly trend (last 6 months)
  const monthly: Record<string, number> = {}
  all.forEach(s => {
    const m = new Date(s.created_at).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })
    monthly[m] = (monthly[m] ?? 0) + 1
  })
  const monthlyEntries = Object.entries(monthly).slice(-6)

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Stats</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your performance across all MRV periods</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: BarChart3,  label: 'Total Surveys', value: all.length, color: 'blue' },
          { icon: TrendingUp, label: 'Approval Rate', value: `${approvalRate}%`, color: 'green' },
          { icon: Award,      label: 'Carbon Credits', value: `${(totalCreditsKg / 1000).toFixed(3)} t`, color: 'amber' },
          { icon: Clock,      label: 'Pending Review', value: all.filter(s => ['submitted','under_review'].includes(s.status)).length, color: 'purple' },
        ].map(({ icon: Icon, label, value, color }) => {
          const palette: Record<string, string> = {
            blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600',
            amber: 'bg-amber-50 text-amber-600', purple: 'bg-purple-50 text-purple-600',
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By period */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">By Monitoring Period</h2>
          </div>
          <div className="px-5 py-2">
            {Object.entries(byPeriod).map(([period, stats]) => (
              <div key={period} className="py-3 border-b border-gray-50 last:border-0">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-gray-700">{period}</p>
                  <p className="text-xs text-gray-500">{stats.total} surveys</p>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${stats.total ? (stats.approved / stats.total) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-xs text-green-600 mt-1">{stats.approved} approved</p>
              </div>
            ))}
            {Object.keys(byPeriod).length === 0 && (
              <p className="py-6 text-sm text-gray-400 text-center">No data yet</p>
            )}
          </div>
        </div>

        {/* Monthly trend */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Monthly Activity</h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            {monthlyEntries.length === 0 && (
              <p className="py-4 text-sm text-gray-400 text-center">No data yet</p>
            )}
            {monthlyEntries.map(([month, count]) => {
              const max = Math.max(...monthlyEntries.map(e => e[1]))
              return (
                <div key={month} className="flex items-center gap-3">
                  <p className="text-xs text-gray-500 w-20 flex-shrink-0">{month}</p>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${max ? (count / max) * 100 : 0}%` }}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-700 w-6 text-right">{count}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
