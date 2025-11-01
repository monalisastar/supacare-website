'use client'

import ReportCard from './ReportCard'

interface Report {
  id: string
  title: string
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  uploadedAt?: string
  fileUrl?: string
  project?: { id: string; name?: string; title?: string }
}

interface ReportListProps {
  reports: Report[]
  statusFilter?: 'all' | 'pending' | 'approved'
}

/**
 * 🗂️ ReportList Component
 * -------------------------------------------------
 * Displays a filtered grid of consultant reports.
 * Each report is represented by <ReportCard />.
 */
export default function ReportList({
  reports,
  statusFilter = 'all',
}: ReportListProps) {
  // 🧮 Filter reports by status
  const filtered = reports.filter((report) => {
    if (statusFilter === 'pending') return report.status === 'PENDING'
    if (statusFilter === 'approved') return report.status === 'APPROVED'
    return true // 'all'
  })

  // 🪣 Empty state
  if (!filtered.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No reports found matching your filters.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  )
}
