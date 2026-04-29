import { createClient } from '@/lib/supabase/server'
import { FileText, Download } from 'lucide-react'

export default async function SupervisorReportsPage() {
  const supabase = await createClient()

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, household_id, status, monitoring_period, county, carbon_credits_kg, created_at, profiles(name, staff_code)')
    .in('status', ['submitted', 'under_review', 'approved', 'rejected'])
    .order('created_at', { ascending: false })

  const all = surveys ?? []

  const csv = [
    ['Survey ID', 'Household ID', 'Enumerator', 'Staff Code', 'County', 'Period', 'Status', 'Carbon Credits (kg)', 'Date'].join(','),
    ...all.map((s: any) => [
      s.id, s.household_id ?? '', (s.profiles as any)?.name ?? '',
      (s.profiles as any)?.staff_code ?? '', s.county ?? '',
      s.monitoring_period ?? '', s.status, s.carbon_credits_kg ?? '', s.created_at,
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  const statusCount: Record<string, number> = {}
  all.forEach(s => { statusCount[s.status] = (statusCount[s.status] ?? 0) + 1 })

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-0.5">Export survey data for supervisor records</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Full Survey Export</h3>
          <p className="text-sm text-gray-500 mt-0.5">{all.length} surveys across all statuses</p>
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
            download="supacare_supervisor_report.csv"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" /> Download CSV
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Status Breakdown</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Count</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Object.entries(statusCount).map(([status, count]) => (
              <tr key={status}>
                <td className="px-5 py-3 font-medium text-gray-700 capitalize">{status.replace('_', ' ')}</td>
                <td className="px-5 py-3 text-right text-gray-700">{count}</td>
                <td className="px-5 py-3 text-right text-gray-500">
                  {all.length ? Math.round((count / all.length) * 100) : 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
