'use server'

import { prisma } from '@/lib/prisma'
import ConsultancyHeader from './components/ConsultancyHeader'
import ConsultancyList from './components/ConsultancyList'
import EmptyState from './components/EmptyState'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ConsultancyCategory } from '@prisma/client'

export default async function ConsultancyDashboardPage() {
  // 🔐 Secure session
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  // 🧠 Fetch consultancy projects for the logged-in client (environmental only)
  const consultancies = email
    ? await prisma.consultancyProject.findMany({
        where: {
          client: { email },
          category: ConsultancyCategory.ENVIRONMENTAL,
        },
        orderBy: { createdAt: 'desc' },
        include: {
          consultant: { select: { name: true, email: true } },
          milestones: true,
          reports: true,
        },
      })
    : []

  const hasConsultancies = consultancies.length > 0

  return (
    <main className="space-y-6">
      {/* Header */}
      <ConsultancyHeader />

      {/* List or Empty State */}
      {hasConsultancies ? (
        <ConsultancyList consultancies={consultancies} />
      ) : (
        <EmptyState />
      )}
    </main>
  )
}
