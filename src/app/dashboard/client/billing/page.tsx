'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import BillingOverview from './components/BillingOverview'
import BillingActions from './components/BillingActions'
import PaymentHistory from './components/PaymentHistory'
import EmptyBillingState from './components/EmptyBillingState'

export default async function BillingPage() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return (
      <main className="p-10 text-center text-red-600">
        Session not found — please log in again.
      </main>
    )
  }

  // 💳 Fetch all payments for this user
  const rawPayments = await prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  // 🧩 Convert Date objects → string for serialization
  const payments = rawPayments.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  // 🧮 Aggregate totals
  const totalPaid = payments
    .filter((p) => p.status === 'SUCCEEDED')
    .reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments
    .filter((p) => p.status === 'PENDING')
    .reduce((sum, p) => sum + p.amount, 0)
  const totalFailed = payments
    .filter((p) => p.status === 'FAILED')
    .reduce((sum, p) => sum + p.amount, 0)

  const currency = payments[0]?.currency || 'KES'

  return (
    <main className="space-y-8">
      <h1 className="text-2xl font-bold text-green-700">Billing & Payments</h1>

      {/* ✅ Always show overview and actions */}
      <BillingOverview
        totalPaid={totalPaid}
        totalPending={totalPending}
        totalFailed={totalFailed}
        currency={currency}
      />

      <BillingActions />

      {/* 🧾 Payment history or empty state */}
      {payments.length > 0 ? (
        <PaymentHistory payments={payments} />
      ) : (
        <EmptyBillingState />
      )}
    </main>
  )
}
