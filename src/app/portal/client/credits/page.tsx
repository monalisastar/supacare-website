import { createClient } from '@/lib/supabase/server'
import { Award, Leaf } from 'lucide-react'

export default async function ClientCreditsPage() {
  const supabase = await createClient()

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, household_id, monitoring_period, county, carbon_credits_kg, created_at')
    .eq('status', 'approved')
    .not('carbon_credits_kg', 'is', null)
    .order('monitoring_period', { ascending: false })

  const rows = surveys ?? []
  const totalKg = rows.reduce((sum, r: any) => sum + (r.carbon_credits_kg ?? 0), 0)

  const byPeriod: Record<string, { kg: number; count: number }> = {}
  rows.forEach((r: any) => {
    const p = r.monitoring_period ?? 'Unassigned'
    if (!byPeriod[p]) byPeriod[p] = { kg: 0, count: 0 }
    byPeriod[p].kg += r.carbon_credits_kg ?? 0
    byPeriod[p].count++
  })

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Carbon Credits</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gold Standard certified · GS4GG Kenya</p>
      </div>

      {/* Header totals */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-600 text-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6" />
            <p className="text-sm font-medium opacity-80">Total Credits Issued</p>
          </div>
          <p className="text-4xl font-bold">{(totalKg / 1000).toFixed(3)}</p>
          <p className="text-sm opacity-70 mt-1">tCO₂e (tonnes)</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Leaf className="w-5 h-5" />
            <p className="text-sm font-medium text-gray-600">Approved Surveys</p>
          </div>
          <p className="text-4xl font-bold text-gray-900">{rows.length}</p>
          <p className="text-sm text-gray-400 mt-1">contributing households</p>
        </div>
      </div>

      {/* By period */}
      {Object.keys(byPeriod).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Credits by Monitoring Period</h2>
          </div>
          <div className="px-5 py-2 divide-y divide-gray-50">
            {Object.entries(byPeriod).map(([period, stats]) => (
              <div key={period} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{period}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stats.count} surveys</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-700">{(stats.kg / 1000).toFixed(3)} t</p>
                  <p className="text-xs text-gray-400">{stats.kg.toFixed(1)} kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Survey Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Household</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Period</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">County</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Credits (t)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No approved surveys yet</td></tr>
              )}
              {rows.map((r: any) => (
                <tr key={r.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{r.household_id ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{r.monitoring_period ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{r.county ?? '—'}</td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700">
                    {(r.carbon_credits_kg / 1000).toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
