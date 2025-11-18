'use client'

import { motion } from 'framer-motion'
import { Truck, Leaf, Wrench, CalendarClock } from 'lucide-react'

type OperationsData = {
  wastePickupsCompleted: number
  compostOrders: number
  activeMachines: number
  nextPickup?: string
}

interface ClientOperationsOverviewProps {
  data: OperationsData
}

/**
 * ⚙️ ClientOperationsOverview
 * ------------------------------------------------------------
 * Shows client's operational statistics — waste pickups,
 * compost orders, machine activity, and next pickup schedule.
 * ------------------------------------------------------------
 */
export default function ClientOperationsOverview({
  data,
}: ClientOperationsOverviewProps) {
  const { wastePickupsCompleted, compostOrders, activeMachines, nextPickup } =
    data

  const items = [
    {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      label: 'Pickups Completed',
      value: wastePickupsCompleted,
      note: 'Total waste pickups handled by Supacare',
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      label: 'Compost Orders',
      value: compostOrders,
      note: 'Orders of compost processed and delivered',
    },
    {
      icon: <Wrench className="w-6 h-6 text-green-600" />,
      label: 'Machines Active',
      value: activeMachines,
      note: 'Compost machines currently running',
    },
  ]

  const formattedPickup =
    nextPickup &&
    new Date(nextPickup).toLocaleString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-sm p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
          My Waste & Operations
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* 📅 Next Pickup Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-8 flex items-center gap-3 bg-green-50 dark:bg-gray-800 border border-green-100 dark:border-gray-700 rounded-xl p-4"
      >
        <CalendarClock className="w-6 h-6 text-green-600" />
        <div>
          <p className="text-sm font-medium text-green-700 dark:text-green-300">
            Next Pickup
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {formattedPickup || 'No upcoming pickups scheduled'}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
