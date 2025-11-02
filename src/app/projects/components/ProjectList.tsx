'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

type ProjectType = {
  title: string
  location: string
  description: string
  image: string
  slug: string
  tag: {
    name: string
    emoji: string
  }
}

// ✅ Correct image paths (Next.js automatically serves /public as root)
const projects: ProjectType[] = [
  {
    title: 'Tree Planting for Watershed Restoration – Kirinyaga',
    location: 'Kirinyaga, Kenya',
    description:
      'Restoring degraded landscapes with native tree species along rivers and hills.',
    image: '/images/tree-planting-kiambu.webp',
    slug: 'tree-planting-kiambu',
    tag: { name: 'Climate', emoji: '♻️' },
  },
  {
    title: 'Urban Sanitation Drive – Nairobi',
    location: 'Nairobi, Kenya',
    description:
      'Street-level cleanup and sanitation campaign involving local youth and vendors.',
    image: '/images/urban-sanitation-nairob.webp',
    slug: 'urban-sanitation-nairobi',
    tag: { name: 'Sanitation', emoji: '🧼' },
  },
  {
    title: 'Plastic-Free Market Initiative – Mombasa',
    location: 'Mombasa, Kenya',
    description:
      'Partnering with vendors to eliminate single-use plastics in local markets.',
    image: '/images/plastic-free-mombasa.webp',
    slug: 'plastic-free-mombasa',
    tag: { name: 'Sanitation', emoji: '🧼' },
  },
]

const ITEMS_PER_PAGE = 3

const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const paginatedProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">
          Featured Projects
        </h2>

        {/* 🟢 Removed Tag Filter section */}

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {paginatedProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded bg-green-100 hover:bg-green-200 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 rounded bg-green-100 hover:bg-green-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

export default ProjectList
