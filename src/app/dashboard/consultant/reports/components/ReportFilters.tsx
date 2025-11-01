'use client'

import { Button } from '@/components/ui/button'

interface ReportFiltersProps {
  activeFilter: 'all' | 'pending' | 'approved'
  onChange: (filter: 'all' | 'pending' | 'approved') => void
}

/**
 * 🧩 ReportFilters Component
 * -------------------------------------------------
 * Lets consultants toggle between All / Pending / Approved reports.
 * Mirrors the look and logic of other dashboard filters for consistency.
 */
export default function ReportFilters({
  activeFilter,
  onChange,
}: ReportFiltersProps) {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
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
          onClick={() => onChange(f.value as 'all' | 'pending' | 'approved')}
        >
          {f.label}
        </Button>
      ))}
    </div>
  )
}
