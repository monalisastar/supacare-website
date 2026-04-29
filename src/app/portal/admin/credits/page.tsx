import { createClient } from '@/lib/supabase/server'
import { Award, TrendingUp, CheckCircle2, Leaf } from 'lucide-react'

export const revalidate = 60

function KpiCard({ icon: Icon, label, value, sub, color = 'green' }: {
  icon: any; label: string; value: string | number; sub?: string; color?: string
}) {
  const palette: Record<string, string> = {
    green:  'bg-green-50 text-green-600',
    blue:   'bg-blue-50 text-blue-600',
    amber:  'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
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

export default async function CreditsPage() {
  const supabase = await createClient()

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, household_id, status, monitoring_period, carbon_credits_kg, county, created_at, profiles(name)')
    .eq('status', 'approved')
    .not('carbon_credits_kg', 'is', null)
    .order('carbon_credits_kg', { ascending: false })

  const rows = surveys ?? []
  const totalKg = rows.reduce((sum, r: any) => sum + (r.carbon_credits_kg ?? 0), 0)
  const totalTonnes = totalKg / 1000
  const avgKg = rows.length ? totalKg / rows.length : 0

  // by period
  const periodMap: Record<string, number> = {}
  rows.forEach((r: any) => {
    const p = r.monitoring_period ?? 'Unknown'
    periodMap[p] = (periodMap[p] ?? 0) + (r.carbon_credits_kg ?? 0)
  })

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Carbon Credits</h1>
        <p className="text-sm text-gray-500 mt-0.5">Calculated credits from approved surveys · Gold Standard GS4GG</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Award}        label="Total Credits" value={`${totalTonnes.toFixed(3)} t CO₂`} color="green" sub="from approved surveys" />
        <KpiCard icon={CheckCircle2} label="Approved Surveys" value={rows.length} color="blue" />
        <KpiCard icon={TrendingUp}   label="Avg per Survey"  value={`${avgKg.toFixed(1)} kg`} color="amber" />
        <KpiCard icon={Leaf}         label="In Tonnes"        value={`${totalTonnes.toFixed(3)}`} color="purple" sub="tCO₂e" />
      </div>

      {/* By period breakdown */}
      {Object.keys(periodMap).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Credits by Monitoring Period</h2>
          </div>
          <div className="px-5 py-2">
            {Object.entries(periodMap).map(([period, kg]) => (
              <div key={period} className="py-3 border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-700">{period}</p>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{(kg / 1000).toFixed(3)} t</p>
                    <p className="text-xs text-gray-400">{kg.toFixed(1)} kg</p>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${totalKg ? (kg / totalKg) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Survey-level table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Survey Detail — Top Credits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Household</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Enumerator</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Period</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">County</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Credits (kg)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Credits (t)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No approved surveys with carbon credit data yet</td></tr>
              )}
              {rows.map((r: any) => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{r.household_id ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-700">{(r.profiles as any)?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{r.monitoring_period ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{r.county ?? '—'}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{r.carbon_credits_kg?.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-green-700 font-semibold">{(r.carbon_credits_kg / 1000).toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
