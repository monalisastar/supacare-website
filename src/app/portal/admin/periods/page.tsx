'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Globe, Check, Pencil } from 'lucide-react'

type Period = {
  id: string
  label: string
  start_date: string | null
  end_date: string | null
  is_active: boolean
  description: string | null
  created_at: string
}

export default function PeriodsPage() {
  const [periods, setPeriods] = useState<Period[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ label: '', start_date: '', end_date: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('monitoring_periods')
      .select('*')
      .order('start_date', { ascending: false })
    setPeriods(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function setActive(id: string) {
    const supabase = createClient()
    // deactivate all, then activate chosen
    await supabase.from('monitoring_periods').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('monitoring_periods').update({ is_active: true }).eq('id', id)
    await load()
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!form.label) { setError('Label is required'); return }
    setSaving(true); setError('')
    const supabase = createClient()
    const { error: err } = await supabase.from('monitoring_periods').insert({
      label: form.label,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      description: form.description || null,
      is_active: false,
    })
    if (err) { setError(err.message); setSaving(false); return }
    setForm({ label: '', start_date: '', end_date: '', description: '' })
    setAdding(false)
    await load()
    setSaving(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MRV Periods</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitoring, Reporting, and Verification periods</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Period
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm">New MRV Period</h2>
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g. M1-2026"
              value={form.label}
              onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={form.start_date}
                onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={form.end_date}
                onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Period'}
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setError('') }}
              className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Periods list */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-50">
        {loading && (
          <div className="px-5 py-10 text-center text-gray-400 text-sm">Loading…</div>
        )}
        {!loading && periods.length === 0 && (
          <div className="px-5 py-10 text-center text-gray-400 text-sm">No periods yet — add your first MRV period</div>
        )}
        {periods.map(p => (
          <div key={p.id} className="px-5 py-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${p.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{p.label}</p>
                  {p.is_active && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                  )}
                </div>
                {(p.start_date || p.end_date) && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {p.start_date ? new Date(p.start_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }) : '?'}
                    {' – '}
                    {p.end_date ? new Date(p.end_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }) : 'ongoing'}
                  </p>
                )}
                {p.description && <p className="text-xs text-gray-500 mt-1">{p.description}</p>}
              </div>
            </div>
            {!p.is_active && (
              <button
                onClick={() => setActive(p.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 flex-shrink-0"
              >
                <Check className="w-3 h-3" /> Set Active
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
