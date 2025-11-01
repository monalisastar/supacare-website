'use client'

import { Card } from '@/components/ui/card'

export default function EmptyBillingState() {
  return (
    <Card className="p-6 bg-green-50 border-green-100 rounded-xl text-gray-700">
      <p>No billing records found yet.</p>
      <p className="text-sm text-gray-500 mt-2">
        Once payments are made, they’ll appear here for tracking and receipts.
      </p>
    </Card>
  )
}
