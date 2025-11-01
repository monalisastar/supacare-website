'use client'

import { useState } from 'react'
import ClientFilters from './ClientFilters'
import ClientList from './ClientList'

/**
 * 🎛️ ClientFiltersWrapper
 * -------------------------------------------------
 * Client-side interactive wrapper for filtering the list.
 */
export default function ClientFiltersWrapper({ clients }: { clients: any[] }) {
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'completed'
  >('all')

  return (
    <>
      <ClientFilters activeFilter={statusFilter} onChange={setStatusFilter} />
      <div className="mt-6">
        <ClientList clients={clients} statusFilter={statusFilter} />
      </div>
    </>
  )
}
