import { createClient } from '@/lib/supabase/server'
import { FileText, Download } from 'lucide-react'

export const revalidate = 0

export default async function ReportsPage() {
  const supabase = await createClient()

  const [
    { data: surveys },
    { data: periods },
  ] = await Promise.all([
    supabase.from('surveys')
      .select('id, household_id, status, monitoring_period, carbon_credits_kg, county, created_at, synced_at, profiles(name, staff_code)')
      .order('created_at', { ascending: false }),
    supabase.from('monitoring_periods')
      .select('id, label')
      .order('start_date', { ascending: false }),
  ])

  const all = surveys ?? []

  // Build a quick CSV payload for download
  const csvRows = [
    ['Survey ID', 'Household ID', 'Enumerator', 'Staff Code', 'County', 'Period', 'Status', 'Carbon Credits (kg)', 'Created At'].join(','),
    ...all.map((s: any) => [
      s.id,
      s.household_id ?? '',
      (s.profiles as any)?.name ?? '',
      (s.profiles as any)?.staff_code ?? '',
      s.county ?? '',
      s.monitoring_period ?? '',
      s.status,
      s.carbon_credits_kg ?? '',
      s.created_at,
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  // summary per period
  const periodSummary: Record<string, { total: number; approved: number; kg: number }> = {}
  all.forEach((s: any) => {
    const p = s.monitoring_period ?? 'Unassigned'
    if (!periodSummary[p]) periodSummary[p] = { total: 0, approved: 0, kg: 0 }
    periodSummary[p].total++
    if (s.status === 'approved') {
      periodSummary[p].approved++
      periodSummary[p].kg += s.carbon_credits_kg ?? 0
    }
  })

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-0.5">Export survey data for Gold Standard MRV submission</p>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Full CSV export */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Full Survey Export</h3>
              <p className="text-sm text-gray-500 mt-0.5">All {all.length} surveys — all statuses</p>
            </div>
          </div>
          <DownloadButton csvContent={csvRows} filename="supacare_all_surveys.csv" label="Download CSV" />
        </div>

        {/* Approved only */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Approved Surveys Only</h3>
              <p className="text-sm text-gray-500 mt-0.5">Ready for Gold Standard submission</p>
            </div>
          </div>
          <ApprovedDownloadButton surveys={all} />
        </div>
      </div>

      {/* Period summary table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Summary by Monitoring Period</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Period</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Approved</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Approval %</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Credits (t)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Object.entries(periodSummary).map(([period, stats]) => (
              <tr key={period} className="hover:bg-gray-50/50">
                <td className="px-5 py-3 font-medium text-gray-700">{period}</td>
                <td className="px-5 py-3 text-right text-gray-600">{stats.total}</td>
                <td className="px-5 py-3 text-right text-green-700 font-medium">{stats.approved}</td>
                <td className="px-5 py-3 text-right text-gray-600">
                  {stats.total ? Math.round((stats.approved / stats.total) * 100) : 0}%
                </td>
                <td className="px-5 py-3 text-right text-green-700 font-semibold">
                  {(stats.kg / 1000).toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── client download buttons ───────────────────────────────────────────────────
// We encode CSV as a data URI so no server action is needed

function DownloadButton({ csvContent, filename, label }: { csvContent: string; filename: string; label: string }) {
  // This is a server component, so we pass the data URI through a hidden link rendered client-side
  // Simplest approach: use an anchor with the blob encoded in href
  return (
    <a
      href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
      download={filename}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors w-fit"
    >
      <Download className="w-4 h-4" />
      {label}
    </a>
  )
}

function ApprovedDownloadButton({ surveys }: { surveys: any[] }) {
  const approved = surveys.filter(s => s.status === 'approved')
  const csv = [
    ['Survey ID', 'Household ID', 'Enumerator', 'Staff Code', 'County', 'Period', 'Carbon Credits (kg)', 'Created At'].join(','),
    ...approved.map((s: any) => [
      s.id,
      s.household_id ?? '',
      (s.profiles as any)?.name ?? '',
      (s.profiles as any)?.staff_code ?? '',
      s.county ?? '',
      s.monitoring_period ?? '',
      s.carbon_credits_kg ?? '',
      s.created_at,
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  return (
    <a
      href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
      download="supacare_approved_surveys.csv"
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors w-fit"
    >
      <Download className="w-4 h-4" />
      Download Approved CSV ({approved.length})
    </a>
  )
}
