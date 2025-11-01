'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  project: any
}

/**
 * 🧩 ProjectCard Component
 * -------------------------------------------------
 * Represents one Consultancy or Carbon Project.
 * Shows key details (title, client, status) + quick actions.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  // 🧠 Determine project type
  const isCarbon = 'methodology' in project
  const typeLabel = isCarbon ? 'Carbon Project' : 'Consultancy Project'
  const name = project.name || project.title
  const status = project.status || project.stage
  const clientName = project.client?.name || 'Unassigned'

  // 🎨 Color coding based on stage/status
  const statusColor =
    status === 'ACTIVE' || status === 'VALIDATION'
      ? 'bg-blue-100 text-blue-700'
      : status === 'COMPLETED' || status === 'ISSUANCE'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700'

  return (
    <Card className="p-5 flex flex-col justify-between border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      {/* 🧩 Header Section */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}
          >
            {status || 'NEW'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{typeLabel}</p>
        <p className="text-sm text-gray-500 mt-1">
          Client: <span className="font-medium">{clientName}</span>
        </p>
      </div>

      {/* 🧭 Footer Actions */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* ✅ Navigate to full project detail */}
          <Link href={`/dashboard/consultant/projects/${project.id}`}>
            <Button size="sm" variant="default" className="gap-1">
              <ExternalLink className="w-4 h-4" />
              View
            </Button>
          </Link>

          {/* 💬 Quick access to project chat */}
          <Link href={`/dashboard/consultant/projects/${project.id}/chat`}>
            <Button size="icon" variant="outline" title="Open Chat">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* 📤 Upload Report shortcut */}
        <Link
          href={`/dashboard/consultant/projects/${project.id}/upload-report`}
          title="Upload Project Report"
        >
          <Button size="icon" variant="ghost">
            <FileText className="w-4 h-4 text-gray-600" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
