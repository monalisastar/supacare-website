'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, XCircle, Wallet } from 'lucide-react'

type Payment = {
  id: string
  amount: number
  currency: string
  method: string
  status: string
  createdAt: string
  entityType?: string
}

export default function PaymentHistory({ payments }: { payments: Payment[] }) {
  if (!payments || payments.length === 0) {
    return (
      <Card className="p-8 bg-green-50 border border-green-100 text-center text-gray-600">
        <p>No payment history available yet.</p>
      </Card>
    )
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        <Wallet className="w-5 h-5 text-green-600" />
        Payment History
      </h2>

      <div className="overflow-x-auto rounded-xl border border-green-100 bg-white/70 backdrop-blur-sm shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-green-50 border-b border-green-100 text-left text-gray-700">
            <tr>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Currency</th>
              <th className="py-3 px-4 font-semibold">Method</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Service</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => {
              const statusColor =
                payment.status === 'SUCCEEDED'
                  ? 'bg-green-100 text-green-700'
                  : payment.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'

              const icon =
                payment.status === 'SUCCEEDED' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : payment.status === 'PENDING' ? (
                  <Clock className="w-4 h-4 text-yellow-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )

              return (
                <tr
                  key={payment.id}
                  className="border-b border-green-50 hover:bg-green-50/30 transition"
                >
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 font-medium text-green-800">
                    {payment.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td className="py-3 px-4 text-gray-700">{payment.currency}</td>

                  <td className="py-3 px-4 text-gray-700">{payment.method}</td>

                  <td className="py-3 px-4">
                    <Badge className={`${statusColor} flex items-center gap-1`}>
                      {icon}
                      {payment.status}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {payment.entityType || 'General Payment'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
