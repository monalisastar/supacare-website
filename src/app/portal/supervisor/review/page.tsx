'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, XCircle, Eye, RefreshCw } from 'lucide-react'

type Survey = {
  id: string
  household_id: string
  status: string
  monitoring_period: string | null
  county: string | null
  created_at: string
  enumerator_name: string | null
  staff_code: string | null
  carbon_credits_kg: number | null
  // survey data fields
  waste_collected_kg: number | null
  num_household_members: number | null
}

export default function ReviewPage() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [selected, setSelected] = useState<Survey | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('surveys')
      .select('id, household_id, status, monitoring_period, county, created_at, carbon_credits_kg, waste_collected_kg, num_household_members, profiles(name, staff_code)')
      .in('status', ['submitted', 'under_review'])
      .order('created_at', { ascending: true })
    const rows: Survey[] = (data ?? []).map((r: any) => ({
      ...r,
      enumerator_name: r.profiles?.name ?? null,
      staff_code: r.profiles?.staff_code ?? null,
    }))
    setSurveys(rows)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, status: 'under_review' | 'approved' | 'rejected') {
    setUpdating(id)
    const supabase = createClient()
    await supabase.from('surveys').update({ status }).eq('id', id)
    setSelected(null)
    await load()
    setUpdating(null)
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
          <p className="text-sm text-gray-500 mt-0.5">{surveys.length} surveys awaiting review</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue list */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-50 overflow-hidden">
          {loading && <p className="px-5 py-10 text-center text-gray-400 text-sm">Loading…</p>}
          {!loading && surveys.length === 0 && (
            <p className="px-5 py-10 text-center text-gray-400 text-sm">
              🎉 Queue is empty — all caught up!
            </p>
          )}
          {surveys.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${selected?.id === s.id ? 'bg-green-50 border-l-2 border-green-500' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">HH {s.household_id ?? '—'}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {s.enumerator_name ?? 'Unknown'} · {s.monitoring_period ?? '—'} · {s.county ?? '—'}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    s.status === 'under_review' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {s.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(s.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div>
              <h2 className="font-bold text-gray-900">Household {selected.household_id ?? '—'}</h2>
              <p className="text-sm text-gray-400 mt-0.5">Survey review</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Enumerator', selected.enumerator_name ?? '—'],
                ['Staff Code', selected.staff_code ?? '—'],
                ['County', selected.county ?? '—'],
                ['Period', selected.monitoring_period ?? '—'],
                ['Status', selected.status.replace('_', ' ')],
                ['Submitted', new Date(selected.created_at).toLocaleDateString('en-KE')],
                ['Waste Collected', selected.waste_collected_kg != null ? `${selected.waste_collected_kg} kg` : '—'],
                ['Household Members', selected.num_household_members ?? '—'],
                ['Carbon Credits', selected.carbon_credits_kg != null ? `${selected.carbon_credits_kg.toFixed(2)} kg` : '—'],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">{k}</p>
                  <p className="font-medium text-gray-800 mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              {selected.status === 'submitted' && (
                <button
                  disabled={updating === selected.id}
                  onClick={() => updateStatus(selected.id, 'under_review')}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm font-medium hover:bg-amber-100 disabled:opacity-50"
                >
                  <Eye className="w-4 h-4" /> Mark Under Review
                </button>
              )}
              <button
                disabled={updating === selected.id}
                onClick={() => updateStatus(selected.id, 'approved')}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve Survey
              </button>
              <button
                disabled={updating === selected.id}
                onClick={() => updateStatus(selected.id, 'rejected')}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" /> Reject Survey
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center p-10">
            <p className="text-sm text-gray-400">Select a survey from the queue to review</p>
          </div>
        )}
      </div>
    </div>
  )
}
