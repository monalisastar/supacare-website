'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail, Building2, Briefcase } from 'lucide-react'

interface ClientCardProps {
  client: {
    id: string
    name: string
    email?: string
    organization?: string
    projectsCount?: number
    activeProjects?: number
    status?: 'ACTIVE' | 'COMPLETED' | 'INACTIVE'
  }
}

/**
 * 🧾 ClientCard Component
 * -------------------------------------------------
 * Displays individual client details such as name, email,
 * organization, and number of consultancy projects.
 * Includes a "View" button that navigates to the client detail page.
 */
export default function ClientCard({ client }: ClientCardProps) {
  const statusColor =
    client.status === 'ACTIVE'
      ? 'bg-green-100 text-green-700'
      : client.status === 'COMPLETED'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-gray-100 text-gray-600'

  return (
    <Card className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      {/* 🧩 Client Header */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}
          >
            {client.status || 'ACTIVE'}
          </span>
        </div>

        {/* 🏢 Organization */}
        {client.organization && (
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <Building2 className="w-4 h-4 text-gray-500" />
            {client.organization}
          </p>
        )}

        {/* 📧 Email */}
        {client.email && (
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-400" />
            {client.email}
          </p>
        )}
      </div>

      {/* 📊 Project Summary & Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-500" />
          {client.projectsCount || 0} Projects
        </div>

        {/* 🔗 View Button */}
        <Link href={`/dashboard/consultant/clients/${client.id}`}>
          <Button variant="default" size="sm" className="gap-1">
            View
          </Button>
        </Link>
      </div>
    </Card>
  )
}
