'use client'

import React from 'react'
import { Leaf, Users, FileCheck, MapPin } from 'lucide-react'

interface Project {
  name: string
  status?: string
  consultant?: { name?: string }
  estimatedCredits?: number
  location?: string
}

export default function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="bg-white rounded-xl border border-green-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-green-700 flex items-center space-x-2">
          <Leaf className="text-green-600" size={20} />
          <span>{project.name || 'Untitled Project'}</span>
        </h2>
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            project.status === 'COMPLETED'
              ? 'bg-green-50 text-green-700'
              : project.status === 'PENDING'
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {project.status || 'In Progress'}
        </span>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
        {/* Consultant */}
        <div className="flex items-center space-x-2">
          <Users size={16} className="text-green-600" />
          <span>
            Consultant:{' '}
            <strong className="text-green-700">
              {project.consultant?.name || 'Unassigned'}
            </strong>
          </span>
        </div>

        {/* Credits */}
        <div className="flex items-center space-x-2">
          <FileCheck size={16} className="text-green-600" />
          <span>
            Estimated Credits:{' '}
            <strong className="text-green-700">
              {project.estimatedCredits ?? 0} tCO₂e
            </strong>
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-green-600" />
          <span>
            Location:{' '}
            <strong className="text-green-700">
              {project.location || 'N/A'}
            </strong>
          </span>
        </div>
      </div>
    </section>
  )
}
