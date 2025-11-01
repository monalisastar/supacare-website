'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MessageSquare, Clock, Users, Star } from 'lucide-react'

interface FiltersProps {
  active: string
  onChange: (key: string) => void
  showRoleFilters?: boolean // optional flag for admin dashboards
}

/**
 * 💬 Global Message Filters Bar
 * -------------------------------------------------
 * Reusable across ALL dashboards (Client, Consultant, Partner, Admin)
 * Controls message visibility by category (All, Unread, Role-specific, Starred)
 */
export default function MessageFilters({
  active,
  onChange,
  showRoleFilters = false,
}: FiltersProps) {
  // Universal filter options
  const baseFilters = [
    { key: 'all', label: 'All', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'unread', label: 'Unread', icon: <Clock className="w-4 h-4" /> },
    { key: 'starred', label: 'Starred', icon: <Star className="w-4 h-4" /> },
  ]

  // Role filters only if admin/staff needs to view by user category
  const roleFilters = showRoleFilters
    ? [
        { key: 'clients', label: 'Clients', icon: <Users className="w-4 h-4" /> },
        { key: 'consultants', label: 'Consultants', icon: <Users className="w-4 h-4" /> },
        { key: 'partners', label: 'Partners', icon: <Users className="w-4 h-4" /> },
      ]
    : []

  const filters = [...baseFilters, ...roleFilters]

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-100 bg-white sticky top-0 z-10">
      {filters.map((f) => (
        <Button
          key={f.key}
          size="sm"
          variant={active === f.key ? 'default' : 'outline'}
          onClick={() => onChange(f.key)}
          className={cn(
            'flex items-center gap-1 rounded-full font-medium transition-all',
            active === f.key
              ? 'bg-green-600 text-white shadow hover:bg-green-700'
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          )}
        >
          {f.icon}
          {f.label}
        </Button>
      ))}
    </div>
  )
}
