'use client'

import { Card } from '@/components/ui/card'
import { Leaf, BatteryCharging, Globe2, Recycle } from 'lucide-react'
import { motion } from 'framer-motion'

type Stats = {
  totalCollected: number
  wasteDiverted: number
  compostable: number
  recyclable: number
  residual: number
  co2eAvoided: number
}

export default function ImpactTracker({ stats }: { stats: Stats }) {
  const diversionRate =
    stats.totalCollected > 0
      ? ((stats.wasteDiverted / stats.totalCollected) * 100).toFixed(1)
      : '0.0'

  const metrics = [
    {
      icon: <Globe2 className="w-6 h-6 text-green-600" />,
      label: 'CO₂e Avoided',
      value: `${stats.co2eAvoided.toFixed(2)} tons`,
      desc: 'GHG emissions reduced by diverting waste from landfill.',
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      label: 'Compost Produced',
      value: `${stats.compostable.toFixed(1)} kg`,
      desc: 'Organic waste transformed into valuable compost.',
    },
    {
      icon: <BatteryCharging className="w-6 h-6 text-green-600" />,
      label: 'Energy Recovered',
      value: `${(stats.recyclable * 0.8).toFixed(1)} kWh`,
      desc: 'Estimated energy recovered through recycling streams.',
    },
    {
      icon: <Recycle className="w-6 h-6 text-green-600" />,
      label: 'Waste Diversion Rate',
      value: `${diversionRate}%`,
      desc: 'Proportion of total waste successfully diverted.',
    },
  ]

  return (
    <section className="space-y-8">
      <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        <Globe2 className="w-5 h-5 text-green-600" /> Impact Tracker
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 border-2 border-green-100 bg-green-50/40 hover:shadow-md transition rounded-2xl">
              <div className="flex items-center justify-between">
                {m.icon}
                <p className="text-2xl font-bold text-green-700">{m.value}</p>
              </div>
              <p className="font-medium text-green-800 mt-3">{m.label}</p>
              <p className="text-sm text-gray-600 mt-1">{m.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 🌱 Summary Insight */}
      <Card className="p-6 border border-green-100 bg-green-50 rounded-xl text-green-800">
        <p className="font-medium">
          🌱 You’ve diverted <strong>{stats.wasteDiverted.toFixed(1)} kg</strong> of waste out of{' '}
          <strong>{stats.totalCollected.toFixed(1)} kg</strong> collected — achieving a{' '}
          <strong>{diversionRate}%</strong> diversion rate and preventing{' '}
          <strong>{stats.co2eAvoided.toFixed(2)} tons</strong> of CO₂e emissions. Great job
          contributing to a cleaner planet!
        </p>
      </Card>
    </section>
  )
}
