'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, Circle, Calendar, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { MilestoneStatus } from '@prisma/client' // ✅ Prisma enum import

interface Milestone {
  id: string
  title: string
  description?: string
  dueDate?: string
  status: MilestoneStatus // ✅ aligned with Prisma
  amount: number
}

interface MilestoneListProps {
  milestones: Milestone[]
}

/**
 * 🧩 MilestoneList Component (Connected)
 * -------------------------------------------------
 * Displays milestones and updates status live via API:
 * PATCH /api/consultant/milestones
 */
export default function MilestoneList({ milestones }: MilestoneListProps) {
  const [updating, setUpdating] = useState<string | null>(null)
  const [localMilestones, setLocalMilestones] = useState(milestones)

  if (!localMilestones?.length) {
    return (
      <div className="text-center py-6 text-gray-500">
        No milestones available for this project.
      </div>
    )
  }

  const handleStatusToggle = async (milestone: Milestone) => {
    // ✅ Define next status logic
    const next =
      milestone.status === MilestoneStatus.PENDING
        ? MilestoneStatus.IN_PROGRESS
        : milestone.status === MilestoneStatus.IN_PROGRESS
        ? MilestoneStatus.COMPLETED
        : MilestoneStatus.COMPLETED

    setUpdating(milestone.id)

    try {
      const res = await fetch('/api/consultant/milestones', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestoneId: milestone.id, newStatus: next }),
      })

      if (!res.ok) {
        throw new Error('Failed to update milestone')
      }

      const data = await res.json()

      // 🧠 Optimistically update UI
      setLocalMilestones((prev) =>
        prev.map((m) =>
          m.id === milestone.id ? { ...m, status: next } : m
        )
      )

      toast?.success(`Milestone marked as ${next.replace('_', ' ')}`)
    } catch (err) {
      console.error(err)
      toast?.error('Error updating milestone status')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="space-y-4">
      {localMilestones.map((m) => {
        const isPending = m.status === MilestoneStatus.PENDING
        const isInProgress = m.status === MilestoneStatus.IN_PROGRESS
        // ✅ Treat APPROVED like COMPLETED for UI consistency
        const isCompleted =
          m.status === MilestoneStatus.COMPLETED ||
          m.status === MilestoneStatus.APPROVED

        const statusIcon = isCompleted ? (
          <CheckCircle2 className="text-green-600 w-5 h-5" />
        ) : isInProgress ? (
          <Clock className="text-blue-600 w-5 h-5" />
        ) : (
          <Circle className="text-gray-400 w-5 h-5" />
        )

        return (
          <Card
            key={m.id}
            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-lg"
          >
            <div className="flex items-start sm:items-center gap-3">
              {statusIcon}
              <div>
                <p className="font-medium text-gray-800">{m.title}</p>
                {m.description && (
                  <p className="text-sm text-gray-500">{m.description}</p>
                )}
                <div className="flex gap-4 mt-1 text-sm text-gray-600">
                  {m.dueDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(m.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    KES {m.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 sm:mt-0">
              <Button
                size="sm"
                variant={isCompleted ? 'outline' : 'default'}
                disabled={updating === m.id || isCompleted}
                onClick={() => handleStatusToggle(m)}
              >
                {updating === m.id
                  ? 'Updating...'
                  : isCompleted
                  ? 'Completed'
                  : isInProgress
                  ? 'Mark as Completed'
                  : 'Start'}
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
