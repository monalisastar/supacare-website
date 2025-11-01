'use client'

import { Button } from '@/components/ui/button'

type PaymentFilter = 'all' | 'pending' | 'succeeded' | 'failed'

interface PaymentFiltersProps {
  activeFilter: PaymentFilter
  onChange: (filter: PaymentFilter) => void
}

/**
 * 🧭 PaymentFilters Component
 * -------------------------------------------------
 * Toggle filters for payment status.
 */
export default function PaymentFilters({
  activeFilter,
  onChange,
}: PaymentFiltersProps) {
  const filters: { label: string; value: PaymentFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Succeeded', value: 'succeeded' },
    { label: 'Failed', value: 'failed' },
  ]

  return (
    <div className="flex gap-3">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={activeFilter === f.value ? 'default' : 'outline'}
          className="px-4 py-2"
          onClick={() => onChange(f.value)} // ✅ type-safe now
        >
          {f.label}
        </Button>
      ))}
    </div>
  )
}
