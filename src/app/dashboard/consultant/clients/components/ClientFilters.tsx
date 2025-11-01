'use client'

import { Button } from '@/components/ui/button'

interface ClientFiltersProps {
  activeFilter: 'all' | 'active' | 'completed'
  onChange: (filter: 'all' | 'active' | 'completed') => void
}

/**
 * 🧩 ClientFilters Component
 * -------------------------------------------------
 * Lets consultants toggle between All / Active / Completed clients.
 * Visually mirrors ProjectFilters for consistency.
 */
export default function ClientFilters({
  activeFilter,
  onChange,
}: ClientFiltersProps) {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={activeFilter === f.value ? 'default' : 'outline'}
          className={`px-5 ${
            activeFilter === f.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-blue-50'
          }`}
          onClick={() => onChange(f.value as 'all' | 'active' | 'completed')}
        >
          {f.label}
        </Button>
      ))}
    </div>
  )
}
