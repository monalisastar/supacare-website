'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wallet, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface PaymentCardProps {
  payment: any
}

/**
 * 💳 PaymentCard Component
 * -------------------------------------------------
 * Displays one payment entry, including project,
 * amount, method, status, and date.
 */
export default function PaymentCard({ payment }: PaymentCardProps) {
  const {
    amount = 0,
    currency = 'KES',
    status = 'PENDING',
    paymentMethod = 'Manual',
    entityType = 'CONSULTANCY',
    createdAt,
    project,
    id,
  } = payment

  // 🎨 Status colors
  const statusStyles = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    SUCCEEDED: 'bg-green-100 text-green-700',
    FAILED: 'bg-red-100 text-red-700',
    REFUNDED: 'bg-gray-200 text-gray-700',
  } as const

  const statusLabel =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()

  return (
    <Card className="p-5 border border-gray-200 rounded-xl shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {entityType} Payment
        </h3>
        <Badge
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100'
          }`}
        >
          {statusLabel}
        </Badge>
      </div>

      {/* Payment Info */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Amount:</span> {currency}{' '}
          {amount.toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Method:</span> {paymentMethod}
        </p>
        {project && (
          <p>
            <span className="font-medium">Project:</span>{' '}
            <Link
              href={`/dashboard/consultant/projects/${project.id}`}
              className="text-green-700 hover:underline"
            >
              {project.name || project.title}
            </Link>
          </p>
        )}
        <p>
          <span className="font-medium">Date:</span>{' '}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-green-600" />
          <span className="text-xs text-gray-500">Txn ID: {id.slice(0, 8)}...</span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" title="View Receipt">
            <FileText className="w-4 h-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" title="Open Project">
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
