'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole, ConsultancyStatus } from '@prisma/client'

import ClientStats from './components/ClientStats'
import ClientFiltersWrapper from './components/ClientFiltersWrapper'

/**
 * 💼 Consultant → Clients Page
 * -------------------------------------------------
 * Displays all clients associated with the consultant’s
 * consultancy projects, including key stats and filters.
 */
export default async function ConsultantClientsPage() {
  const session = await getServerSession(authOptions)
  const consultantId = session?.user?.id
  const role = session?.user?.role as UserRole

  if (!consultantId || role !== UserRole.CONSULTANT) {
    return (
      <div className="p-10 text-center text-red-600">
        Access denied. Consultant session not found.
      </div>
    )
  }

  // 🧩 Fetch consultancy projects + related clients
  const consultancyProjects = await prisma.consultancyProject.findMany({
    where: { consultantId },
    include: { client: true },
  })

  // 🧮 Extract unique clients and summarize
  const clientsMap = new Map<string, any>()
  consultancyProjects.forEach((project) => {
    if (project.client) {
      const existing = clientsMap.get(project.client.id)
      const status = project.status

      if (existing) {
        existing.projectsCount += 1
        if (status === ConsultancyStatus.IN_PROGRESS) existing.activeProjects += 1
        if (status === ConsultancyStatus.COMPLETED) existing.completedProjects += 1
      } else {
        clientsMap.set(project.client.id, {
          id: project.client.id,
          name: project.client.name,
          email: project.client.email,
          organization: project.client.organization || 'N/A',
          projectsCount: 1,
          activeProjects: status === ConsultancyStatus.IN_PROGRESS ? 1 : 0,
          completedProjects: status === ConsultancyStatus.COMPLETED ? 1 : 0,
          status,
        })
      }
    }
  })

  const clients = Array.from(clientsMap.values())

  // 🧮 Stats
  const totalClients = clients.length
  const activeProjects = consultancyProjects.filter(
    (p) => p.status === ConsultancyStatus.IN_PROGRESS
  ).length
  const completedProjects = consultancyProjects.filter(
    (p) => p.status === ConsultancyStatus.COMPLETED
  ).length

  // 🧭 Render
  return (
    <div className="flex flex-col space-y-10 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ClientStats
        totalClients={totalClients}
        activeProjects={activeProjects}
        completedProjects={completedProjects}
      />
      <ClientFiltersWrapper clients={clients} />
    </div>
  )
}
