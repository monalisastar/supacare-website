'use client'

import { Card } from '@/components/ui/card'
import { Users, Briefcase, CheckCircle } from 'lucide-react'

interface ClientStatsProps {
  totalClients: number
  activeProjects: number
  completedProjects: number
}

/**
 * 🧾 ClientStats Component
 * -------------------------------------------------
 * Displays high-level metrics for the consultant’s clients:
 * - Total clients under consultancy
 * - Active consultancy projects
 * - Completed consultancy projects
 */
export default function ClientStats({
  totalClients,
  activeProjects,
  completedProjects,
}: ClientStatsProps) {
  const stats = [
    {
      label: 'Total Clients',
      value: totalClients,
      icon: <Users className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: <Briefcase className="w-5 h-5 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      label: 'Completed Projects',
      value: completedProjects,
      icon: <CheckCircle className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`p-5 rounded-xl flex items-center justify-between ${stat.bg} border border-gray-200 shadow-sm`}
        >
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stat.value}
            </p>
          </div>
          {stat.icon}
        </Card>
      ))}
    </div>
  )
}
