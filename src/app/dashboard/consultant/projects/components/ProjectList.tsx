'use client'

import ProjectCard from './ProjectCard'

interface ProjectListProps {
  projects: any[]
  typeFilter?: 'all' | 'consultancy' | 'carbon'
  statusFilter?: 'all' | 'active' | 'completed'
}

/**
 * 🗂️ ProjectList Component
 * -------------------------------------------------
 * Renders a filtered grid of projects.
 * Delegates the individual layout to <ProjectCard />.
 */
export default function ProjectList({
  projects,
  typeFilter = 'all',
  statusFilter = 'all',
}: ProjectListProps) {
  // 🧩 Helper to detect project type
  const isCarbon = (project: any) => 'methodology' in project

  // 🧮 Apply filters
  const filtered = projects.filter((p) => {
    // Type filtering
    if (typeFilter === 'consultancy' && isCarbon(p)) return false
    if (typeFilter === 'carbon' && !isCarbon(p)) return false

    // Status filtering
    if (statusFilter === 'active') {
      return p.status === 'ACTIVE' || p.stage === 'VALIDATION'
    }
    if (statusFilter === 'completed') {
      return p.status === 'COMPLETED' || p.stage === 'ISSUANCE'
    }

    return true // 'all'
  })

  // 🪣 Empty state
  if (!filtered.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No projects found matching your filters.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
