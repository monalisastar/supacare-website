import { createClient } from '@/lib/supabase/server'
import { BarChart3, TrendingUp, Users, MapPin } from 'lucide-react'

export const revalidate = 60 // refresh every minute

function StatRow({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default async function TabulationPage() {
  const supabase = await createClient()

  const [
    { data: surveys },
    { data: byEnumerator },
    { data: byCounty },
    { data: byPeriod },
  ] = await Promise.all([
    supabase.from('surveys')
      .select('status, monitoring_period, carbon_credits_kg, county, enumerator_id'),
    supabase.from('surveys')
      .select('enumerator_id, profiles(name), status')
      .not('enumerator_id', 'is', null),
    supabase.from('surveys')
      .select('county, status')
      .not('county', 'is', null),
    supabase.from('surveys')
      .select('monitoring_period, status, carbon_credits_kg')
      .not('monitoring_period', 'is', null),
  ])

  // ── aggregations ────────────────────────────────────────────────────────────
  const all = surveys ?? []
  const total = all.length
  const approved = all.filter(s => s.status === 'approved').length
  const pending = all.filter(s => ['submitted', 'under_review'].includes(s.status)).length
  const totalKg = all.filter(s => s.status === 'approved')
    .reduce((sum, s) => sum + (s.carbon_credits_kg ?? 0), 0)

  // by period
  const periodMap: Record<string, { total: number; approved: number; kg: number }> = {}
  ;(byPeriod ?? []).forEach((s: any) => {
    const p = s.monitoring_period
    if (!periodMap[p]) periodMap[p] = { total: 0, approved: 0, kg: 0 }
    periodMap[p].total++
    if (s.status === 'approved') { periodMap[p].approved++; periodMap[p].kg += s.carbon_credits_kg ?? 0 }
  })

  // by county
  const countyMap: Record<string, number> = {}
  ;(byCounty ?? []).forEach((s: any) => {
    countyMap[s.county] = (countyMap[s.county] ?? 0) + 1
  })
  const topCounties = Object.entries(countyMap).sort((a, b) => b[1] - a[1]).slice(0, 8)

  // by enumerator
  const enumMap: Record<string, { name: string; count: number; approved: number }> = {}
  ;(byEnumerator ?? []).forEach((s: any) => {
    const id = s.enumerator_id
    if (!enumMap[id]) enumMap[id] = { name: (s.profiles as any)?.name ?? id, count: 0, approved: 0 }
    enumMap[id].count++
    if (s.status === 'approved') enumMap[id].approved++
  })
  const topEnumerators = Object.values(enumMap).sort((a, b) => b.count - a.count).slice(0, 8)

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tabulation</h1>
        <p className="text-sm text-gray-500 mt-0.5">Aggregated survey statistics across all MRV periods</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Surveys', value: total, icon: BarChart3, color: 'blue' },
          { label: 'Approved', value: approved, icon: TrendingUp, color: 'green' },
          { label: 'Pending', value: pending, icon: Users, color: 'amber' },
          { label: 'Carbon Credits', value: `${(totalKg / 1000).toFixed(2)} t`, icon: MapPin, color: 'purple' },
        ].map(({ label, value, icon: Icon, color }) => {
          const palette: Record<string, string> = {
            blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600',
            amber: 'bg-amber-50 text-amber-600', purple: 'bg-purple-50 text-purple-600',
          }
          return (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${palette[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* By period */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">By Monitoring Period</h2>
          </div>
          <div className="px-5 py-2">
            {Object.entries(periodMap).length === 0 && (
              <p className="py-6 text-sm text-gray-400 text-center">No data</p>
            )}
            {Object.entries(periodMap).map(([period, stats]) => (
              <div key={period} className="py-3 border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-700">{period}</p>
                  <p className="text-xs text-gray-400">{stats.total} surveys</p>
                </div>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span className="text-green-600 font-medium">{stats.approved} approved</span>
                  <span>·</span>
                  <span>{(stats.kg / 1000).toFixed(2)} t CO₂</span>
                </div>
                {/* progress bar */}
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${stats.total ? (stats.approved / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By county */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">By County</h2>
          </div>
          <div className="px-5 py-2">
            {topCounties.length === 0 && (
              <p className="py-6 text-sm text-gray-400 text-center">No data</p>
            )}
            {topCounties.map(([county, count]) => (
              <StatRow key={county} label={county} value={count} sub="surveys" />
            ))}
          </div>
        </div>

        {/* By enumerator */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">By Enumerator</h2>
          </div>
          <div className="px-5 py-2">
            {topEnumerators.length === 0 && (
              <p className="py-6 text-sm text-gray-400 text-center">No data</p>
            )}
            {topEnumerators.map(e => (
              <div key={e.name} className="py-3 border-b border-gray-50 last:border-0 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">{e.name}</p>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{e.count}</p>
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
