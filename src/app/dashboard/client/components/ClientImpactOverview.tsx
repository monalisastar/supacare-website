'use client'

import { motion } from 'framer-motion'
import { Leaf, Recycle, TreeDeciduous, Factory } from 'lucide-react'

/** 📊 Type for impact metrics */
export type ImpactMetrics = {
  co2Reduced: number
  wasteDiverted: number
  compostProduced: number
  treesEquivalent?: number
  period?: string
}

/** 🧠 Props for the overview component */
interface ClientImpactOverviewProps {
  data: ImpactMetrics
}

/**
 * 🌿 ClientImpactOverview
 * ------------------------------------------------------------
 * Hero section showing the client's sustainability impact.
 * Displays CO₂ reduction, waste diversion, compost production,
 * and trees-equivalent metrics with subtle animation.
 * ------------------------------------------------------------
 */
export default function ClientImpactOverview({ data }: ClientImpactOverviewProps) {
  if (!data) return null

  const {
    co2Reduced,
    wasteDiverted,
    compostProduced,
    treesEquivalent,
    period = 'This Month',
  } = data

  const items = [
    {
      icon: <Factory className="w-6 h-6 text-green-600" />,
      label: 'CO₂ Reduced',
      value: `${co2Reduced.toFixed(1)} tons`,
      note: 'Less greenhouse gas in the atmosphere',
    },
    {
      icon: <Recycle className="w-6 h-6 text-green-600" />,
      label: 'Waste Diverted',
      value: `${wasteDiverted.toFixed(1)} kg`,
      note: 'Kept out of landfills through recycling',
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      label: 'Compost Produced',
      value: `${compostProduced.toFixed(1)} kg`,
      note: 'Organic waste turned into new life',
    },
    {
      icon: <TreeDeciduous className="w-6 h-6 text-green-600" />,
      label: 'Trees Equivalent',
      value: treesEquivalent ? `${treesEquivalent} trees` : '—',
      note: 'Your impact equals planting real trees',
    },
  ]

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-sm p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
          My Impact Summary
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {period}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="flex flex-col items-start justify-between bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              {item.icon}
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {item.label}
              </p>
            </div>
            <h3 className="text-3xl font-bold text-green-700 dark:text-green-400">
              {item.value}
            </h3>
            <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
              {item.note}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
