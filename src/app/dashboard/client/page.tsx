'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole, ConsultancyStatus } from '@prisma/client'

// 🧩 Dashboard Components
import SustainabilityOverview from '@/components/dashboard/SustainabilityOverview'
import OperationsSnapshot from '@/components/dashboard/OperationsSnapshot'
import ProjectsOverview from '@/components/dashboard/ProjectsOverview'
import DashboardSummary from '@/components/dashboard/DashboardSummary'

/**
 * ♻️ Client Dashboard
 * -------------------------------------------------
 * Displays sustainability metrics, operations,
 * and project data for CLIENT role.
 */

export default async function ClientDashboardPage() {
  // 🔐 Secure session retrieval
  const session = await getServerSession(authOptions)
  const role = (session?.user?.role as UserRole) || UserRole.CLIENT

  // 🧩 Fetch all required data concurrently
  const [
    metrics,
    compostMachines,
    compostSales,
    wastePickups,
    carbonProjects,
    consultancyProjects,
  ] = await Promise.all([
    prisma.sustainabilityMetric.findMany().catch(() => []),
    prisma.compostMachine.findMany().catch(() => []),
    prisma.compostSale.findMany().catch(() => []),
    prisma.wastePickup.findMany().catch(() => []),
    prisma.carbonProject.findMany().catch(() => []),
    prisma.consultancyProject.findMany().catch(() => []),
  ])

  // ♻️ Sustainability totals
  const totals = {
    co2Reduced: metrics.reduce((s, m) => s + (m.co2Reduced ?? 0), 0),
    wasteDiverted: metrics.reduce((s, m) => s + (m.wasteDiverted ?? 0), 0),
    compostProduced: metrics.reduce((s, m) => s + (m.compostProduced ?? 0), 0),
  }

  // ⚙️ Operations snapshot
  const ops = {
    activeMachines: compostMachines.length,
    compostSales: compostSales.length,
    wastePickups: wastePickups.length,
  }

  // 💼 Project overview
  const projects = {
    consultancyProjects: consultancyProjects.length,
    carbonProjects: carbonProjects.length,
    projectsInProgress: consultancyProjects.filter(
      // ✅ FIXED: your enum uses IN_PROGRESS, not ACTIVE
      (p) => p.status === ConsultancyStatus.IN_PROGRESS
    ).length,
    projectsCompleted: consultancyProjects.filter(
      (p) => p.status === ConsultancyStatus.COMPLETED
    ).length,
  }

  // 🧭 Render dashboard modules
  return (
    <div className="flex flex-col space-y-10 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* 🌿 Sustainability Section */}
      <section>
        <SustainabilityOverview metrics={totals} />
      </section>

      {/* ⚙️ Operations Snapshot */}
      <section>
        {/* ✅ Convert Prisma UserRole to frontend Role type */}
        <OperationsSnapshot role="CLIENT" data={ops} />
      </section>

      {/* 📊 Projects Overview */}
      <section>
        <ProjectsOverview role="CLIENT" data={projects} />
      </section>

      {/* 🧾 Summary */}
      <section>
        <DashboardSummary
          role="CLIENT"
          summaryData={{
            co2Reduced: totals.co2Reduced,
            compostProduced: totals.compostProduced,
          }}
        />
      </section>
    </div>
  )
}
