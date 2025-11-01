'use client'

import React from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  id: string
  name: string
  status: string
  consultant?: string
  credits?: number
  progress?: number
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  // 🔹 If no projects exist
  if (!projects.length) {
    return (
      <p className="text-center text-gray-500 py-12">
        No carbon projects available.
      </p>
    )
  }

  // 🔹 Render project cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}
