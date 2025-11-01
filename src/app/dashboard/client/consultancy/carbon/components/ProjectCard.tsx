'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Leaf, Timer, Users, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  id: string
  name: string
  status: string
  consultant?: string
  credits?: number
  progress?: number
}

export default function ProjectCard({
  id,
  name,
  status,
  consultant,
  credits,
  progress,
}: ProjectCardProps) {
  // 🟢 Map status to color badge
  const statusColor =
    status === 'Verified'
      ? 'bg-green-100 text-green-700'
      : status === 'Under Validation'
      ? 'bg-yellow-100 text-yellow-700'
      : status === 'Pending'
      ? 'bg-gray-100 text-gray-600'
      : 'bg-blue-100 text-blue-700'

  return (
    <Card className="hover:shadow-md transition border-green-100 bg-white">
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle className="text-green-700 flex items-center gap-2">
            <Leaf size={18} className="text-green-600" />
            {name}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Managed by{' '}
            <span className="font-medium text-green-700">
              {consultant || 'Unassigned'}
            </span>
          </p>
        </div>

        {/* 🏷️ Status badge */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}
        >
          {status}
        </span>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 🌿 Credits */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FileText size={16} className="text-green-600" />
          <span>
            Estimated Credits:{' '}
            <span className="font-medium text-green-700">
              {credits ? `${credits} tCO₂e` : '—'}
            </span>
          </span>
        </div>

        {/* ⏱️ Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress || 0}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 text-right">
          {progress ? `${progress}% Complete` : 'Not started'}
        </p>

        {/* 🔗 View Details */}
        <Link
          href={`/dashboard/client/carbon/${id}`}
          className="text-green-700 text-sm font-medium flex items-center hover:underline mt-2"
        >
          View Project <ArrowRight size={14} className="ml-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
