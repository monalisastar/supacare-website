'use client'

import { motion } from 'framer-motion'
import { CreditCard, Clock, XCircle, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'

type BillingData = {
  totalPaid: number
  pending: number
  failed: number
  currency?: string
}

interface ClientBillingOverviewProps {
  data: BillingData
}

/**
 * 💳 ClientBillingOverview
 * ------------------------------------------------------------
 * Displays client payment summary: total paid, pending,
 * and failed payments with color-coded cards and actions.
 * ------------------------------------------------------------
 */
export default function ClientBillingOverview({
  data,
}: ClientBillingOverviewProps) {
  const { totalPaid, pending, failed, currency = 'KES' } = data

  const cards = [
    {
      label: 'Total Paid',
      value: `${currency} ${totalPaid.toLocaleString()}`,
      icon: <Wallet className="w-6 h-6 text-green-600" />,
      color: 'from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900',
    },
    {
      label: 'Pending',
      value: `${currency} ${pending.toLocaleString()}`,
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      color: 'from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900',
    },
    {
      label: 'Failed',
      value: `${currency} ${failed.toLocaleString()}`,
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      color: 'from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900',
    },
  ]

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-sm p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
          Billing & Payments
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className={`bg-gradient-to-br ${card.color} rounded-xl p-5 shadow hover:shadow-md transition`}
          >
            <div className="flex items-center gap-3 mb-3">
              {card.icon}
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {card.label}
              </p>
            </div>
            <h3 className="text-3xl font-bold text-green-700 dark:text-green-400">
              {card.value}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* 💸 Payment Action */}
      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Make Payment
        </Button>
      </div>
    </section>
  )
}
