'use server'

import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'
import MilestoneList from '../components/MilestoneList'
import ReportUploadModal from '../components/ReportUploadModal'
import ChatAccessButton from '../components/ChatAccessButton'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import { ConsultancyStatus } from '@prisma/client'

/**
 * 🔍 Consultant Project Detail Page
 * -------------------------------------------------
 * Fetches and displays one ConsultancyProject
 * with milestones, reports, and chat access.
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await prisma.consultancyProject.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      milestones: true,
      reports: true,
    },
  })

  if (!project) return notFound()

  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-10">
      {/* 🧾 Project Header */}
      <Card className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            {project.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Client: {project.client?.name || 'N/A'}
          </p>
          <Badge
            className={
              project.status === ConsultancyStatus.IN_PROGRESS
                ? 'bg-blue-100 text-blue-700'
                : project.status === ConsultancyStatus.COMPLETED
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }
          >
            {project.status}
          </Badge>
        </div>

        <div className="mt-4 md:mt-0">
          {/* ✅ FIXED: Remove unsupported variant, label optional */}
          <ChatAccessButton projectId={project.id} />
        </div>
      </Card>

      {/* 🧠 Project Description */}
      {project.description && (
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-50">
            Project Description
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </Card>
      )}

      {/* 📅 Milestones */}
      <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
          Project Milestones
        </h3>
        {/* ✅ Convert Date → string for type compatibility */}
        <MilestoneList
          milestones={project.milestones.map((m) => ({
            ...m,
            description: m.description ?? undefined,
            dueDate: m.dueDate ? m.dueDate.toISOString() : undefined,
          }))}
        />
      </Card>

      {/* 📤 Report Upload */}
      <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
          Upload Project Report
        </h3>
        <ReportUploadModal projectId={project.id} projectType="consultancy" />
      </Card>
    </div>
  )
}
