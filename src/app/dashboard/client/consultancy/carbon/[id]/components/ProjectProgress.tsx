'use client'

import React from 'react'
import { BarChart3, CheckCircle2, Timer } from 'lucide-react'

interface Props {
  projectId: string
  currentStage?: string
  totalCredits?: number
}

export default function ProjectProgress({
  projectId,
  currentStage = 'CONCEPT',
  totalCredits = 0,
}: Props) {
  // 🧮 Map stages to progress percentage
  const stageProgressMap: Record<string, number> = {
    CONCEPT: 25,
    VALIDATION: 50,
    VERIFICATION: 75,
    ISSUANCE: 100,
  }

  const progress = stageProgressMap[currentStage] ?? 0
  const stageLabel =
    currentStage.charAt(0) + currentStage.slice(1).toLowerCase()

  return (
    <section className="bg-white rounded-xl border border-green-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-green-700 flex items-center space-x-2">
          <BarChart3 size={18} className="text-green-600" />
          <span>Project Progress</span>
        </h2>
        <span className="text-sm text-green-700 font-medium">
          {progress}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-green-100 h-3 rounded-full overflow-hidden">
        <div
          className="bg-green-600 h-3 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Timer size={14} />
          <span>{stageLabel}</span>
        </div>

        {progress === 100 && (
          <div className="flex items-center space-x-1 text-green-700">
            <CheckCircle2 size={14} />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Optional: show total credits */}
      {totalCredits > 0 && (
        <p className="mt-3 text-xs text-gray-500">
          <strong>{totalCredits.toLocaleString()}</strong> total carbon credits
          issued.
        </p>
      )}
    </section>
  )
}
