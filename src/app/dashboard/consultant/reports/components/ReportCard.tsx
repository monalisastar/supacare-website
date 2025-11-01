'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, ExternalLink, Download } from 'lucide-react'
import Link from 'next/link'

interface ReportCardProps {
  report: {
    id: string
    title: string
    project?: { id: string; title?: string; name?: string }
    status?: 'PENDING' | 'APPROVED' | 'REJECTED'
    uploadedAt?: string
    fileUrl?: string
  }
}

/**
 * 📄 ReportCard Component
 * -------------------------------------------------
 * Displays one consultancy report with:
 * - Report title
 * - Linked project
 * - Upload date
 * - Quick actions (View / Download / Open Project)
 */
export default function ReportCard({ report }: ReportCardProps) {
  const { id, title, project, status, uploadedAt, fileUrl } = report

  const statusColor =
    status === 'APPROVED'
      ? 'bg-green-100 text-green-700'
      : status === 'PENDING'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-red-100 text-red-700'

  return (
    <Card className="p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}
          >
            {status || 'PENDING'}
          </span>
        </div>

        {project && (
          <p className="text-sm text-gray-600">
            Project:{' '}
            <span className="font-medium">
              {project.name || project.title || 'Untitled Project'}
            </span>
          </p>
        )}

        <p className="text-sm text-gray-500 mt-1">
          Uploaded on:{' '}
          {uploadedAt
            ? new Date(uploadedAt).toLocaleDateString()
            : 'Not Available'}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          {fileUrl ? (
            <>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Report"
              >
                <Button size="icon" variant="outline">
                  <FileText className="w-4 h-4" />
                </Button>
              </a>
              <a href={fileUrl} download title="Download Report">
                <Button size="icon" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </a>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">
              No file uploaded
            </span>
          )}
        </div>

        {project && (
          <Link href={`/dashboard/consultant/projects/${project.id}`}>
            <Button size="sm" className="gap-1">
              <ExternalLink className="w-4 h-4" />
              Project
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}
