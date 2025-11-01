'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ProjectFiltersProps {
  onTypeChange?: (type: 'all' | 'consultancy' | 'carbon') => void
  onStatusChange?: (status: 'all' | 'active' | 'completed') => void
}

/**
 * 🧭 ProjectFilters Component
 * -------------------------------------------------
 * Client-side toolbar that controls visible project type
 * (Consultancy / Carbon) and status (All / Active / Completed)
 */
export default function ProjectFilters({
  onTypeChange,
  onStatusChange,
}: ProjectFiltersProps) {
  const [type, setType] = useState<'all' | 'consultancy' | 'carbon'>('all')
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all')

  const handleType = (newType: typeof type) => {
    setType(newType)
    onTypeChange?.(newType)
  }

  const handleStatus = (newStatus: typeof status) => {
    setStatus(newStatus)
    onStatusChange?.(newStatus)
  }

  const types = [
    { label: 'All', value: 'all' },
    { label: 'Consultancy', value: 'consultancy' },
    { label: 'Carbon', value: 'carbon' },
  ]

  const statuses = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      {/* 🔹 Filter by Type */}
      <div className="flex flex-wrap gap-2">
        {types.map((btn) => (
          <Button
            key={btn.value}
            onClick={() => handleType(btn.value as typeof type)}
            className={cn(
              'rounded-full text-sm px-4 py-1 transition-all',
              type === btn.value
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {/* 🔹 Filter by Status */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((btn) => (
          <Button
            key={btn.value}
            onClick={() => handleStatus(btn.value as typeof status)}
            className={cn(
              'rounded-full text-sm px-4 py-1 transition-all',
              status === btn.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </motion.div>
  )
}
