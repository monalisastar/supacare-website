'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, Filter, RefreshCw, ChevronDown } from 'lucide-react'

type Survey = {
  id: string
  household_id: string
  status: string
  monitoring_period: string | null
  created_at: string
  synced_at: string | null
  enumerator_name: string | null
  county: string | null
  carbon_credits_kg: number | null
}

const STATUSES = ['all', 'draft', 'submitted', 'under_review', 'approved', 'rejected']

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

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('all')
  const [periods, setPeriods] = useState<string[]>([])
  const [updating, setUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    let q = supabase
      .from('surveys')
      .select('id, household_id, status, monitoring_period, created_at, synced_at, county, carbon_credits_kg, profiles(name)')
      .order('created_at', { ascending: false })
      .limit(200)

    if (statusFilter !== 'all') q = q.eq('status', statusFilter)
    if (periodFilter !== 'all') q = q.eq('monitoring_period', periodFilter)
    if (search) q = q.ilike('household_id', `%${search}%`)

    const { data } = await q
    const rows: Survey[] = (data ?? []).map((r: any) => ({
      ...r,
      enumerator_name: r.profiles?.name ?? null,
    }))
    setSurveys(rows)

    // collect unique periods
    const ps = Array.from(new Set(rows.map(r => r.monitoring_period).filter(Boolean))) as string[]
    if (ps.length) setPeriods(ps)

    setLoading(false)
  }, [statusFilter, periodFilter, search])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    const supabase = createClient()
    await supabase.from('surveys').update({ status }).eq('id', id)
    await load()
    setUpdating(null)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Surveys</h1>
          <p className="text-sm text-gray-500 mt-0.5">{surveys.length} records loaded</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search household ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All statuses' : s.replace('_', ' ')}</option>
          ))}
        </select>

        {periods.length > 0 && (
          <select
            value={periodFilter}
            onChange={e => setPeriodFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="all">All periods</option>
            {periods.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Household</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Enumerator</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Period</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Credits (kg)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">Loading…</td></tr>
              )}
              {!loading && surveys.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No surveys found</td></tr>
              )}
              {surveys.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{s.household_id ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-700">{s.enumerator_name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{s.monitoring_period ?? '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-gray-700">{s.carbon_credits_kg != null ? s.carbon_credits_kg.toFixed(1) : '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(s.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    {s.status === 'submitted' && (
                      <div className="flex gap-1">
                        <button
                          disabled={updating === s.id}
                          onClick={() => updateStatus(s.id, 'under_review')}
                          className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs hover:bg-amber-100 disabled:opacity-50"
                        >
                          Review
                        </button>
                      </div>
                    )}
                    {s.status === 'under_review' && (
                      <div className="flex gap-1">
                        <button
                          disabled={updating === s.id}
                          onClick={() => updateStatus(s.id, 'approved')}
                          className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          disabled={updating === s.id}
                          onClick={() => updateStatus(s.id, 'rejected')}
                          className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs hover:bg-red-100 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    )}
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
