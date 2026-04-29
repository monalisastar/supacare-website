'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserPlus, Search } from 'lucide-react'
import Link from 'next/link'

type StaffMember = {
  id: string
  name: string
  email: string
  role: string
  staff_code: string | null
  county: string | null
  is_active: boolean
  allow_google_auth: boolean
  created_at: string
  survey_count?: number
}

const ROLE_BADGE: Record<string, string> = {
  admin:      'bg-purple-100 text-purple-700',
  supervisor: 'bg-blue-100 text-blue-700',
  enumerator: 'bg-green-100 text-green-700',
  client:     'bg-amber-100 text-amber-700',
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [toggling, setToggling] = useState<string | null>(null)
  const [togglingGoogle, setTogglingGoogle] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('id, name, email, role, staff_code, county, is_active, allow_google_auth, created_at')
      .neq('role', 'client')
      .order('created_at', { ascending: false })

    setStaff(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function toggleActive(id: string, current: boolean) {
    setToggling(id)
    const supabase = createClient()
    await supabase.from('profiles').update({ is_active: !current }).eq('id', id)
    await load()
    setToggling(null)
  }

  async function toggleGoogleAuth(id: string, current: boolean) {
    setTogglingGoogle(id)
    const supabase = createClient()
    await supabase.from('profiles').update({ allow_google_auth: !current }).eq('id', id)
    await load()
    setTogglingGoogle(null)
  }

  const filtered = staff.filter(s => {
    const matchRole = roleFilter === 'all' || s.role === roleFilter
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.staff_code ?? '').toLowerCase().includes(search.toLowerCase())
    return matchRole && matchSearch
  })

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} staff members</p>
        </div>
        <Link
          href="/portal/admin/staff/new"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Add Staff
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, email, or staff code…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="supervisor">Supervisor</option>
          <option value="enumerator">Enumerator</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Staff Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">County</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Google Auth</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">Loading…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No staff found</td></tr>
              )}
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_BADGE[s.role] ?? 'bg-gray-100 text-gray-600'}`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{s.staff_code ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{s.county ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        disabled={togglingGoogle === s.id}
                        onClick={() => toggleGoogleAuth(s.id, s.allow_google_auth)}
                        title={s.allow_google_auth ? 'Revoke Google sign-in' : 'Allow Google sign-in'}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors disabled:opacity-50 focus:outline-none ${
                          s.allow_google_auth ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                          s.allow_google_auth ? 'translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </button>
                      <span className={`text-xs ${s.allow_google_auth ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                        {s.allow_google_auth ? 'On' : 'Off'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={toggling === s.id}
                      onClick={() => toggleActive(s.id, s.is_active)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50 ${
                        s.is_active
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {s.is_active ? 'Deactivate' : 'Activate'}
                    </button>
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
