'use client'

import { useState } from 'react'
import PaymentFilters from './PaymentFilters'
import PaymentList from './PaymentList'

/**
 * 🎛️ PaymentFiltersWrapper
 * -------------------------------------------------
 * Client-side interactive state manager for filters.
 */
export default function PaymentFiltersWrapper({
  payments,
}: {
  payments: any[]
}) {
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'pending' | 'succeeded' | 'failed'
  >('all')

  return (
    <>
      <PaymentFilters activeFilter={statusFilter} onChange={setStatusFilter} />
      <div className="mt-6">
        <PaymentList payments={payments} statusFilter={statusFilter} />
      </div>
    </>
  )
}
