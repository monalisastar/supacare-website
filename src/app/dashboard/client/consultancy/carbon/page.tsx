'use client'

import React, { useEffect, useState } from 'react'
import CarbonHeader from './components/CarbonHeader'
import ProjectList from './components/ProjectList'
import EmptyState from './components/EmptyState'

export default function ClientCarbonDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🧠 Fetch Carbon Consultancy Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/client/consultancy?category=CARBON')
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Failed to fetch projects')

        setProjects(data.projects || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <p className="text-gray-600">Loading carbon projects...</p>
  if (error)
    return (
      <p className="text-red-600 bg-red-50 p-3 rounded-md">
        ❌ {error}
      </p>
    )

  return (
    <div className="space-y-8">
      {/* 🌿 Header */}
      <CarbonHeader />

      {/* 🧩 Conditional Rendering */}
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
