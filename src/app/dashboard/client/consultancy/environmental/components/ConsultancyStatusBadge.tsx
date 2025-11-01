'use client'

import React from 'react'

interface Props {
  status: string
}

export default function ConsultancyStatusBadge({ status }: Props) {
  const base =
    'px-3 py-1 rounded-full text-xs font-medium inline-block capitalize'

  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    inprogress: 'bg-blue-100 text-blue-700 border border-blue-200',
    completed: 'bg-green-100 text-green-700 border border-green-200',
    approved: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    rejected: 'bg-red-100 text-red-700 border border-red-200',
  }

  // Normalize the status key
  const key = status?.toLowerCase().replace(/\s/g, '') || 'pending'

  return (
    <span className={`${base} ${styles[key] || styles.pending}`}>
      {status || 'Pending'}
    </span>
  )
}
