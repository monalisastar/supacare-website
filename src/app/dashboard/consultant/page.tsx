'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole, ConsultancyStatus, PaymentStatus } from '@prisma/client'

// ♻️ Global Dashboard Components
import SustainabilityOverview from '@/components/dashboard/SustainabilityOverview'
import OperationsSnapshot from '@/components/dashboard/OperationsSnapshot'
import ProjectsOverview from '@/components/dashboard/ProjectsOverview'
import DashboardSummary from '@/components/dashboard/DashboardSummary'

/**
 * 💼 Consultant Dashboard
 * -------------------------------------------------
 * Displays assigned projects, reports, and
 * performance summary for CONSULTANT role.
 */
export default async function ConsultantDashboardPage() {
  const session = await getServerSession(authOptions)
  const role = (session?.user?.role as UserRole) || UserRole.CONSULTANT
  const consultantId = session?.user?.id

  if (!consultantId) {
    return (
      <div className="p-10 text-center text-red-600">
        Session not found — please log in again.
      </div>
    )
  }

  // 🧩 Fetch consultant-specific data concurrently
  const [consultancyProjects, carbonProjects, reports, payments] = await Promise.all([
    prisma.consultancyProject
      .findMany({
        where: { consultantId },
        include: { client: true },
      })
      .catch(() => []),

    prisma.carbonProject
      .findMany({
        where: { consultantId },
        include: { client: true },
      })
      .catch(() => []),

    prisma.carbonReport
      .findMany({
        where: { authorId: consultantId },
        include: { project: true },
      })
      .catch(() => []),

    prisma.payment
      .findMany({
        where: {
          milestone: {
            project: {
              consultantId,
            },
          },
        },
        include: {
          milestone: {
            include: {
              project: true,
            },
          },
        },
      })
      .catch(() => []),
  ])

  // 🧮 Summary calculations
  const totals = {
    assignedProjects: consultancyProjects.length + carbonProjects.length,
    activeProjects:
      consultancyProjects.filter(
        (p) => p.status === ConsultancyStatus.IN_PROGRESS // ✅ Fixed enum
      ).length +
      carbonProjects.filter((p) => p.stage && p.stage !== 'CONCEPT').length,
    completedProjects:
      consultancyProjects.filter(
        (p) => p.status === ConsultancyStatus.COMPLETED // ✅ Fixed enum
      ).length +
      carbonProjects.filter((p) => p.stage === 'ISSUANCE').length,
    reportsSubmitted: reports.length,
  }

  // ⚙️ Operations snapshot
  const clientsSet = new Set([
    ...consultancyProjects.map((p) => p.clientId),
    ...carbonProjects.map((p) => p.clientId),
  ])

  const ops = {
    clientsServed: clientsSet.size,
    totalEarnings: payments.reduce((sum: number, p: any) => sum + (p.amount ?? 0), 0),
    pendingPayments: payments.filter(
      (p: any) => p.status === PaymentStatus.PENDING
    ).length,
  }

  // 💼 Project overview for charts
  const projects = {
    consultancy: consultancyProjects.length,
    carbon: carbonProjects.length,
    total: totals.assignedProjects,
    active: totals.activeProjects,
  }

  const summary = {
    reports: totals.reportsSubmitted,
    earnings: ops.totalEarnings,
    clients: ops.clientsServed,
  }

  return (
    <div className="flex flex-col space-y-10 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* 📊 Project Overview */}
      <section>
        <ProjectsOverview role="CONSULTANT" data={projects} /> {/* ✅ Fixed role */}
      </section>

      {/* ⚙️ Operations Snapshot */}
      <section>
        <OperationsSnapshot role="CONSULTANT" data={ops} /> {/* ✅ Fixed role */}
      </section>

      {/* 🧾 Summary */}
      <section>
        <DashboardSummary role="CONSULTANT" summaryData={summary} /> {/* ✅ Fixed role */}
      </section>

      {/* 🌿 Sustainability Metrics */}
      <section>
        <SustainabilityOverview
          metrics={{
            co2Reduced: 0,
            wasteDiverted: 0,
            compostProduced: 0,
          }}
        />
      </section>
    </div>
  )
}
