'use client'

import React from 'react'
import { Calendar, FileText } from 'lucide-react'
import ConsultancyStatusBadge from './ConsultancyStatusBadge'

interface ConsultancyCardProps {
  consultancy: {
    id: string
    title: string
    company: string
    status: string
    createdAt: string
    description?: string
  }
  onClick?: (id: string) => void
}

export default function ConsultancyCard({ consultancy, onClick }: ConsultancyCardProps) {
  return (
    <div
      onClick={() => onClick?.(consultancy.id)}
      className="border rounded-xl p-5 bg-white hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-green-700 text-lg">
          {consultancy.title}
        </h3>
        <ConsultancyStatusBadge status={consultancy.status} />
      </div>

      {/* Description */}
      {consultancy.description && (
        <p className="text-gray-600 text-sm line-clamp-2">
          {consultancy.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
        <div className="flex items-center gap-2">
          <FileText size={14} />
          <span>{consultancy.company}</span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(consultancy.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
