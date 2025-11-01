'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProjectOverview from './components/ProjectOverview'
import ProjectProgress from './components/ProjectProgress'
import ProjectDocuments from './components/ProjectDocuments'
import ActivityFeed from './components/ActivityFeed'

// 💡 Schema-aligned CarbonProject interface
interface CarbonProject {
  id: string
  name: string
  methodology: string
  stage: string
  annualTarget?: number
  description?: string
  client?: {
    name: string
    email: string
  }
  consultant?: {
    name: string
    email: string
  }
  uploads?: { id: string; fileUrl: string; description?: string; uploadedAt: string }[]
  ledger?: { id: string; credits: number; tokenized: boolean; createdAt: string }[]
  reports?: { id: string; title: string; reportUrl?: string; createdAt: string }[]
}

export default function CarbonProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState<CarbonProject | null>(null)
  const [loading, setLoading] = useState(true)

  // 🧭 Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/client/carbon/${id}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data)
        } else {
          console.error('❌ Failed to fetch project:', res.statusText)
        }
      } catch (err) {
        console.error('Error fetching project:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProject()
  }, [id])

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p>Loading project details...</p>
      </div>
    )
  }

  // 🚫 Empty / error UI
  if (!project) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No project found or it has been removed.</p>
      </div>
    )
  }

  // ✅ Render full project view
  return (
    <div className="space-y-8">
      <ProjectOverview project={project} />

      <ProjectProgress
        projectId={project.id}
        currentStage={project.stage}
        totalCredits={project.ledger?.reduce((sum, l) => sum + l.credits, 0) ?? 0}
      />

      {/* ✅ FIX: Pass mapped uploads as ProjectDocuments expects */}
      <ProjectDocuments
        project={{
          documents:
            project.uploads?.map((u) => ({
              id: u.id,
              name: u.description || `File uploaded on ${new Date(u.uploadedAt).toLocaleDateString()}`,
              url: u.fileUrl,
            })) ?? [],
        }}
      />

      <ActivityFeed projectId={project.id} />
    </div>
  )
}
