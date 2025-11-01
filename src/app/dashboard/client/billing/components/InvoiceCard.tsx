'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function InvoiceCard({ payment }: { payment: any }) {
  const { serviceType, amount, status, method, reference, createdAt } = payment

  const badgeStyle =
    status === 'PAID'
      ? 'bg-green-100 text-green-700'
      : status === 'PENDING'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-red-100 text-red-700'

  return (
    <Card className="p-6 border-2 border-green-100 bg-white hover:shadow-md transition rounded-2xl">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-green-800">
            {serviceType || 'General Service'}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()} via {method}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-green-700">
            KES {amount.toFixed(2)}
          </p>
          <Badge className={badgeStyle}>{status}</Badge>
        </div>
      </div>

      {reference && (
        <p className="text-sm text-gray-500 mt-2">Reference: {reference}</p>
      )}

      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm">
          Download Receipt
        </Button>
      </div>
    </Card>
  )
}
