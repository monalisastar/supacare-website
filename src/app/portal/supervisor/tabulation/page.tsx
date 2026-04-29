import { createClient } from '@/lib/supabase/server'
import { BarChart3 } from 'lucide-react'

export const revalidate = 60

export default async function SupervisorTabulationPage() {
  const supabase = await createClient()

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, status, monitoring_period, carbon_credits_kg, county, enumerator_id, profiles(name)')
    .order('created_at', { ascending: false })

  const all = surveys ?? []
  const total = all.length
  const approved = all.filter(s => s.status === 'approved').length
  const pending = all.filter(s => ['submitted', 'under_review'].includes(s.status)).length
  const totalKg = all.filter(s => s.status === 'approved')
    .reduce((sum, s: any) => sum + (s.carbon_credits_kg ?? 0), 0)

  const byPeriod: Record<string, { total: number; approved: number; kg: number }> = {}
  all.forEach((s: any) => {
    const p = s.monitoring_period ?? 'Unassigned'
    if (!byPeriod[p]) byPeriod[p] = { total: 0, approved: 0, kg: 0 }
    byPeriod[p].total++
    if (s.status === 'approved') { byPeriod[p].approved++; byPeriod[p].kg += s.carbon_credits_kg ?? 0 }
  })

  const byEnumerator: Record<string, { name: string; total: number; approved: number }> = {}
  all.forEach((s: any) => {
    const id = s.enumerator_id ?? 'unknown'
    if (!byEnumerator[id]) byEnumerator[id] = { name: s.profiles?.name ?? id, total: 0, approved: 0 }
    byEnumerator[id].total++
    if (s.status === 'approved') byEnumerator[id].approved++
  })

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tabulation</h1>
        <p className="text-sm text-gray-500 mt-0.5">Survey aggregates for review oversight</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Surveys', value: total },
          { label: 'Approved', value: approved },
          { label: 'Pending', value: pending },
          { label: 'Carbon (t)', value: `${(totalKg / 1000).toFixed(2)}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">By Monitoring Period</h2>
          </div>
          <div className="px-5 py-2 divide-y divide-gray-50">
            {Object.entries(byPeriod).map(([period, stats]) => (
              <div key={period} className="py-3">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-gray-700">{period}</p>
                  <p className="text-xs text-gray-400">{stats.total} surveys</p>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${stats.total ? (stats.approved / stats.total) * 100 : 0}%` }} />
                </div>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span className="text-green-600">{stats.approved} approved</span>
                  <span>· {(stats.kg / 1000).toFixed(2)} t CO₂</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">By Enumerator</h2>
          </div>
          <div className="px-5 py-2 divide-y divide-gray-50">
            {Object.values(byEnumerator).sort((a, b) => b.total - a.total).slice(0, 10).map(e => (
              <div key={e.name} className="py-3 flex items-center justify-between">
                <p className="text-sm text-gray-700">{e.name}</p>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{e.total}</p>
                  <p className="text-xs text-green-600">{e.approved} approved</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
