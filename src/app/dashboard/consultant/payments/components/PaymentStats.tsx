'use client'

import { Card } from '@/components/ui/card'
import { Wallet, Clock, XCircle } from 'lucide-react'

interface PaymentStatsProps {
  totalPaid: number
  totalPending: number
  totalFailed: number
}

/**
 * 💰 PaymentStats
 * -------------------------------------------------
 * Displays overall payment status summary for consultants.
 */
export default function PaymentStats({
  totalPaid,
  totalPending,
  totalFailed,
}: PaymentStatsProps) {
  const stats = [
    {
      icon: <Wallet className="text-green-600 w-6 h-6" />,
      label: 'Total Paid',
      value: `KES ${totalPaid.toLocaleString()}`,
      bg: 'bg-green-50',
    },
    {
      icon: <Clock className="text-yellow-600 w-6 h-6" />,
      label: 'Pending Payments',
      value: `KES ${totalPending.toLocaleString()}`,
      bg: 'bg-yellow-50',
    },
    {
      icon: <XCircle className="text-red-600 w-6 h-6" />,
      label: 'Failed / Refunded',
      value: `KES ${totalFailed.toLocaleString()}`,
      bg: 'bg-red-50',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <Card
          key={s.label}
          className={`flex items-center justify-between p-6 rounded-xl shadow-sm border border-gray-200 ${s.bg}`}
        >
          <div>
            <p className="text-sm text-gray-600">{s.label}</p>
            <h3 className="text-xl font-semibold text-gray-900">{s.value}</h3>
          </div>
          {s.icon}
        </Card>
      ))}
    </div>
  )
}
