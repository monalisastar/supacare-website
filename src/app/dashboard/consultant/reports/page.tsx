'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole, ConsultancyStatus } from '@prisma/client'
import ReportStats from './components/ReportStats'
import ReportFiltersWrapper from './components/ReportFiltersWrapper'

/**
 * 💼 Consultant → Reports Page (Server Side)
 * -------------------------------------------------
 * Fetches reports directly via Prisma.
 * No client-side fetch → no JSON parse errors.
 */
export default async function ConsultantReportsPage() {
  // 🔐 Get current session
  const session = await getServerSession(authOptions)
  const consultantId = session?.user?.id
  const role = session?.user?.role as UserRole

  // 🚫 Guard: allow only consultants
  if (!consultantId || role !== UserRole.CONSULTANT) {
    return (
      <div className="p-10 text-center text-red-600">
        Access denied. Consultant session not found.
      </div>
    )
  }

  // 🧩 Fetch consultancy reports for this consultant
  const reports = await prisma.consultancyReport.findMany({
    where: { project: { consultantId } },
    include: { project: true },
    orderBy: { uploadedAt: 'desc' },
  })

  // 🧮 Stats
  const totalReports = reports.length

  // ✅ Safely handle cases where status is only on the project
  const pendingReports = reports.filter(
    (r) => r.project?.status === ConsultancyStatus.IN_PROGRESS
  ).length

  const approvedReports = reports.filter(
    (r) => r.project?.status === ConsultancyStatus.COMPLETED
  ).length

  // 🧭 Render page
  return (
    <div className="flex flex-col space-y-10 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* 🧾 Stats Summary */}
      <ReportStats
        totalReports={totalReports}
        pendingReports={pendingReports}
        approvedReports={approvedReports}
      />

      {/* 📋 Reports */}
      <ReportFiltersWrapper reports={reports} />
    </div>
  )
}
