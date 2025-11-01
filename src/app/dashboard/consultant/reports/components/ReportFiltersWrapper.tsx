'use client'

import { useState } from 'react'
import ReportFilters from './ReportFilters'
import ReportList from './ReportList'

/**
 * 🎛️ ReportFiltersWrapper
 * -------------------------------------------------
 * Client-side interactive wrapper that manages filter state.
 */
export default function ReportFiltersWrapper({
  reports,
}: {
  reports: any[]
}) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all')

  return (
    <>
      <ReportFilters activeFilter={statusFilter} onChange={setStatusFilter} />
      <div className="mt-6">
        <ReportList reports={reports} statusFilter={statusFilter} />
      </div>
    </>
  )
}
