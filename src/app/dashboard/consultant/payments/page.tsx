'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole, PaymentStatus } from '@prisma/client'

import PaymentStats from './components/PaymentStats'
import PaymentFiltersWrapper from './components/PaymentFiltersWrapper'

/**
 * 💼 Consultant → Payments Page
 * -------------------------------------------------
 * Displays all consultancy & carbon project payments
 * associated with the consultant.
 */
export default async function ConsultantPaymentsPage() {
  const session = await getServerSession(authOptions)
  const consultantId = session?.user?.id
  const role = session?.user?.role as UserRole

  if (!consultantId || role !== UserRole.CONSULTANT) {
    return (
      <div className="p-10 text-center text-red-600">
        Access denied — consultant session not found.
      </div>
    )
  }

  // 🧩 Fetch consultant payments (via project relation)
  const payments = await prisma.payment.findMany({
    where: {
      milestone: {
        project: {
          consultantId,
        },
      },
      entityType: { in: ['CONSULTANCY', 'CARBON'] },
    },
    include: {
      milestone: {
        include: {
          project: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // 🧮 Compute Totals
  const totalPaid = payments
    .filter((p) => p.status === PaymentStatus.SUCCEEDED)
    .reduce((sum, p) => sum + (p.amount ?? 0), 0)

  const totalPending = payments
    .filter((p) => p.status === PaymentStatus.PENDING)
    .reduce((sum, p) => sum + (p.amount ?? 0), 0)

  const totalFailed = payments.filter(
    (p) => p.status === PaymentStatus.FAILED || p.status === PaymentStatus.REFUNDED
  ).length

  // 🧭 Render Dashboard
  return (
    <div className="flex flex-col space-y-10 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* 💳 Payment Summary Stats */}
      <PaymentStats
        totalPaid={totalPaid}
        totalPending={totalPending}
        totalFailed={totalFailed}
      />

      {/* 🎛️ Filter Controls + List */}
      <PaymentFiltersWrapper payments={payments} />
    </div>
  )
}
