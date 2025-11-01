'use client'

import { Card } from '@/components/ui/card'
import { Briefcase, Leaf, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectStatsProps {
  consultancy: any[]
  carbon: any[]
  reports: any[]
}

/**
 * 📊 ProjectStats Component
 * -------------------------------------------------
 * Displays top-level consultant metrics:
 * - Consultancy projects count
 * - Carbon projects count
 * - Reports submitted
 */
export default function ProjectStats({
  consultancy,
  carbon,
  reports,
}: ProjectStatsProps) {
  const stats = [
    {
      label: 'Consultancy Projects',
      value: consultancy?.length ?? 0,
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50',
    },
    {
      label: 'Carbon Projects',
      value: carbon?.length ?? 0,
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      color: 'bg-green-50',
    },
    {
      label: 'Reports Submitted',
      value: reports?.length ?? 0,
      icon: <FileText className="w-5 h-5 text-yellow-600" />,
      color: 'bg-yellow-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <Card
            className={`p-5 flex flex-col justify-center items-center text-center rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all ${s.color}`}
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              {s.icon}
              <p className="font-medium text-gray-800">{s.label}</p>
            </div>
            <p className="text-3xl font-semibold mt-2 text-gray-900">
              {s.value}
            </p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
