'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Leaf, LayoutDashboard, ClipboardList, Users, BarChart3,
  FileText, Settings, LogOut, Menu, X, ChevronRight,
  ShieldCheck, Globe, Award,
} from 'lucide-react'

interface Profile {
  id: string
  name: string
  email: string
  role: string
  staff_code?: string
  county?: string
  is_active: boolean
}

// ── Nav items per role ────────────────────────────────────────────────────────

const NAV: Record<string, { href: string; label: string; icon: any }[]> = {
  admin: [
    { href: '/portal/admin',            label: 'Dashboard',       icon: LayoutDashboard },
    { href: '/portal/admin/surveys',    label: 'Surveys',         icon: ClipboardList   },
    { href: '/portal/admin/staff',      label: 'Staff',           icon: Users           },
    { href: '/portal/admin/tabulation', label: 'Tabulation',      icon: BarChart3       },
    { href: '/portal/admin/credits',    label: 'Carbon Credits',  icon: Award           },
    { href: '/portal/admin/reports',    label: 'Reports',         icon: FileText        },
    { href: '/portal/admin/periods',    label: 'MRV Periods',     icon: Globe           },
  ],
  supervisor: [
    { href: '/portal/supervisor',              label: 'Dashboard',  icon: LayoutDashboard },
    { href: '/portal/supervisor/review',       label: 'Review Queue', icon: ShieldCheck  },
    { href: '/portal/supervisor/tabulation',   label: 'Tabulation', icon: BarChart3      },
    { href: '/portal/supervisor/reports',      label: 'Reports',    icon: FileText       },
  ],
  enumerator: [
    { href: '/portal/enumerator',         label: 'My Surveys',   icon: ClipboardList   },
    { href: '/portal/enumerator/stats',   label: 'My Stats',     icon: BarChart3       },
  ],
  client: [
    { href: '/portal/client',             label: 'My Impact',    icon: Leaf            },
    { href: '/portal/client/credits',     label: 'My Credits',   icon: Award           },
    { href: '/portal/client/reports',     label: 'Reports',      icon: FileText        },
  ],
}

const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrator',
  supervisor: 'Supervisor',
  enumerator: 'Enumerator',
  client: 'Client',
}

const ROLE_COLORS: Record<string, string> = {
  admin:      'bg-purple-100 text-purple-700',
  supervisor: 'bg-blue-100 text-blue-700',
  enumerator: 'bg-green-100 text-green-700',
  client:     'bg-amber-100 text-amber-700',
}

// ─────────────────────────────────────────────────────────────────────────────

export default function PortalShell({
  profile,
  children,
}: {
  profile: Profile | null
  children: React.ReactNode
}) {
  const pathname  = usePathname()
  const router    = useRouter()
  const [open, setOpen] = useState(false)

  const role    = profile?.role ?? 'client'
  const navItems = NAV[role] ?? NAV.client

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">Supacare</p>
          <p className="text-xs text-gray-400">GS4GG Kenya</p>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
            {profile?.name?.charAt(0) ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{profile?.name ?? 'User'}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[role]}`}>
              {ROLE_LABELS[role]}
            </span>
          </div>
        </div>
        {profile?.staff_code && (
          <p className="text-xs text-gray-400 mt-2 font-mono">{profile.staff_code}</p>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/portal/' + role && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-green-50 text-green-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 opacity-50" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
        <Link
          href="/portal/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Public site link */}
      <div className="px-6 py-3 border-t border-gray-100">
        <Link href="/" className="text-xs text-gray-400 hover:text-green-600 transition-colors">
          ← supacaresolutions.co.ke
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-white border-r border-gray-200 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile topbar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setOpen(true)} className="p-1.5 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="font-bold text-sm text-gray-900">Supacare</span>
          </div>
          <div className="w-8" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
