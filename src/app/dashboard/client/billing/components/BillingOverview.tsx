'use client'

import { Card } from '@/components/ui/card'
import { Wallet, Clock, XCircle } from 'lucide-react'

type BillingOverviewProps = {
  totalPaid: number
  totalPending: number
  totalFailed?: number
  currency?: string
}

export default function BillingOverview({
  totalPaid,
  totalPending,
  totalFailed = 0,
  currency = 'KES', // Default to KES if not provided
}: BillingOverviewProps) {
  // Format number nicely for currency display
  const formatValue = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Define stats cards
  const stats = [
    {
      icon: <Wallet className="text-green-600 w-6 h-6" />,
      label: 'Total Paid',
      value: `${currency} ${formatValue(totalPaid)}`,
      bg: 'bg-green-50',
    },
    {
      icon: <Clock className="text-yellow-600 w-6 h-6" />,
      label: 'Pending',
      value: `${currency} ${formatValue(totalPending)}`,
      bg: 'bg-yellow-50',
    },
    {
      icon: <XCircle className="text-red-600 w-6 h-6" />,
      label: 'Failed',
      value: `${currency} ${formatValue(totalFailed)}`,
      bg: 'bg-red-50',
    },
  ]

  return (
    <section className="grid md:grid-cols-3 gap-6">
      {stats.map((s) => (
        <Card
          key={s.label}
          className={`p-6 rounded-2xl border border-green-100 shadow-sm ${s.bg}`}
        >
          <div className="flex items-center justify-between">
            {s.icon}
            <p className="text-lg font-semibold text-green-700">{s.value}</p>
          </div>
          <p className="mt-3 text-sm text-gray-700">{s.label}</p>
        </Card>
      ))}
    </section>
  )
}
