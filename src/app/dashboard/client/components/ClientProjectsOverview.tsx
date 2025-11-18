'use client'

import { motion } from 'framer-motion'
import { Leaf, Globe2, CheckCircle2, BarChart3 } from 'lucide-react'
import Link from 'next/link'

type ProjectStats = {
  environmental: {
    total: number
    inProgress: number
    completed: number
  }
  carbon: {
    total: number
    inProgress: number
    completed: number
  }
}

interface ClientProjectsOverviewProps {
  data: ProjectStats
}

/**
 * 🌿 ClientProjectsOverview
 * ------------------------------------------------------------
 * Displays summary of Environmental Consultancy and Carbon
 * Projects for the client — total, progress, and completion.
 * ------------------------------------------------------------
 */
export default function ClientProjectsOverview({
  data,
}: ClientProjectsOverviewProps) {
  const cards = [
    {
      title: 'Environmental Consultancy',
      icon: <Globe2 className="w-6 h-6 text-green-600" />,
      color: 'from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900',
      stats: data.environmental,
      link: '/dashboard/client/consultancy/environmental',
    },
    {
      title: 'Carbon Projects',
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      color: 'from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900',
      stats: data.carbon,
      link: '/dashboard/client/consultancy/carbon',
    },
  ]

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-sm p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
          My Consultancy & Carbon Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className={`bg-gradient-to-br ${card.color} rounded-xl p-5 shadow hover:shadow-md transition`}
          >
            <div className="flex items-center gap-3 mb-4">
              {card.icon}
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {card.title}
              </h3>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <BarChart3 size={16} />
                <span>Total:</span>
              </div>
              <span className="font-semibold text-green-700 dark:text-green-400">
                {card.stats.total}
              </span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Leaf size={16} />
                <span>In Progress:</span>
              </div>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                {card.stats.inProgress}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle2 size={16} />
                <span>Completed:</span>
              </div>
              <span className="font-semibold text-green-700 dark:text-green-400">
                {card.stats.completed}
              </span>
            </div>

            <Link
              href={card.link}
              className="inline-block mt-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
