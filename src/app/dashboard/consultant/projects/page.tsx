// ✅ Remove 'use server'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import ProjectStats from './components/ProjectStats'
import ProjectFilters from './components/ProjectFilters'
import ProjectList from './components/ProjectList'
import prisma from '@/lib/prisma'
import type { ConsultancyProject, CarbonProject, CarbonReport } from '@prisma/client'

/**
 * 🧭 Consultant Projects Dashboard
 * -------------------------------------------------
 * Displays consultancy + carbon projects and reports.
 * Dynamic rendering ensures build succeeds on Vercel.
 */
export default async function ConsultantProjectsPage() {
  const [consultancy, carbon, reports]: [
    ConsultancyProject[],
    CarbonProject[],
    CarbonReport[]
  ] = await Promise.all([
    prisma.consultancyProject.findMany({
      include: { client: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.carbonProject.findMany({
      include: { client: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.carbonReport.findMany({
      include: { project: true },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const allProjects = [...consultancy, ...carbon]

  return (
    <div className="p-6 space-y-6">
      <ProjectStats consultancy={consultancy} carbon={carbon} reports={reports} />
      <ProjectFilters />
      {allProjects.length > 0 ? (
        <ProjectList projects={allProjects} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          No projects found. Start by creating a new consultancy or carbon project.
        </div>
      )}
    </div>
  )
}
