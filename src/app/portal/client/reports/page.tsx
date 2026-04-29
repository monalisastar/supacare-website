import { createClient } from '@/lib/supabase/server'
import { FileText, Download } from 'lucide-react'

export default async function ClientReportsPage() {
  const supabase = await createClient()

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, household_id, monitoring_period, county, carbon_credits_kg, created_at')
    .eq('status', 'approved')
    .not('carbon_credits_kg', 'is', null)
    .order('monitoring_period', { ascending: false })

  const rows = surveys ?? []
  const totalKg = rows.reduce((sum: number, r: any) => sum + (r.carbon_credits_kg ?? 0), 0)

  const csv = [
    ['Household ID', 'Monitoring Period', 'County', 'Carbon Credits (kg)', 'Carbon Credits (t)', 'Date'].join(','),
    ...rows.map((r: any) => [
      r.household_id ?? '',
      r.monitoring_period ?? '',
      r.county ?? '',
      r.carbon_credits_kg ?? '',
      ((r.carbon_credits_kg ?? 0) / 1000).toFixed(4),
      r.created_at,
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  const byPeriod: Record<string, { kg: number; count: number }> = {}
  rows.forEach((r: any) => {
    const p = r.monitoring_period ?? 'Unassigned'
    if (!byPeriod[p]) byPeriod[p] = { kg: 0, count: 0 }
    byPeriod[p].kg += r.carbon_credits_kg ?? 0
    byPeriod[p].count++
  })

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-0.5">Download project data for your records</p>
      </div>

      {/* Download card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Carbon Credits Report</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {rows.length} approved surveys · {(totalKg / 1000).toFixed(3)} tCO₂e total
          </p>
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
            download="supacare_carbon_credits_report.csv"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" /> Download CSV
          </a>
        </div>
      </div>

      {/* Period summary */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Summary by Period</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Period</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Surveys</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Credits (kg)</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Credits (t)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Object.keys(byPeriod).length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-gray-400">No data yet</td></tr>
            )}
            {Object.entries(byPeriod).map(([period, stats]) => (
              <tr key={period} className="hover:bg-gray-50/50">
                <td className="px-5 py-3 font-medium text-gray-700">{period}</td>
                <td className="px-5 py-3 text-right text-gray-600">{stats.count}</td>
                <td className="px-5 py-3 text-right text-gray-700">{stats.kg.toFixed(2)}</td>
                <td className="px-5 py-3 text-right font-semibold text-green-700">{(stats.kg / 1000).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
