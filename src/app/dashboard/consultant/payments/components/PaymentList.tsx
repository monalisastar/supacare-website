'use client'

import PaymentCard from './PaymentCard'

interface PaymentListProps {
  payments: any[]
  statusFilter?: 'all' | 'pending' | 'succeeded' | 'failed'
}

/**
 * 💳 PaymentList Component
 * -------------------------------------------------
 * Displays a filtered grid of consultant payments.
 * Each item is a <PaymentCard /> showing transaction details.
 */
export default function PaymentList({
  payments,
  statusFilter = 'all',
}: PaymentListProps) {
  // 🧮 Apply filters
  const filtered = payments.filter((p) => {
    if (statusFilter === 'pending') return p.status === 'PENDING'
    if (statusFilter === 'succeeded') return p.status === 'SUCCEEDED'
    if (statusFilter === 'failed')
      return p.status === 'FAILED' || p.status === 'REFUNDED'
    return true // 'all'
  })

  // 🪣 Empty state
  if (!filtered.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No payments found matching your filters.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  )
}
