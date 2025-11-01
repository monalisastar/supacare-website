'use client'

import { Card } from '@/components/ui/card'
import { FileText, Clock, CheckCircle } from 'lucide-react'

interface ReportStatsProps {
  totalReports: number
  pendingReports: number
  approvedReports: number
}

/**
 * 🧾 ReportStats Component
 * -------------------------------------------------
 * Displays consultant report metrics:
 * - Total reports submitted
 * - Pending approval
 * - Approved reports
 */
export default function ReportStats({
  totalReports,
  pendingReports,
  approvedReports,
}: ReportStatsProps) {
  const stats = [
    {
      label: 'Total Reports',
      value: totalReports,
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Pending Reports',
      value: pendingReports,
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50',
    },
    {
      label: 'Approved Reports',
      value: approvedReports,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      bg: 'bg-green-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`p-5 rounded-xl flex items-center justify-between ${stat.bg} border border-gray-200 shadow-sm`}
        >
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stat.value}
            </p>
          </div>
          {stat.icon}
        </Card>
      ))}
    </div>
  )
}
