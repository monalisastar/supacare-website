'use client'

import { motion } from 'framer-motion'
import {
  FaRecycle,
  FaTruckMoving,
  FaChartLine,
  FaAward,
  FaGlobeAfrica,
} from 'react-icons/fa'

const benefits = [
  {
    icon: <FaRecycle size={36} className="text-[#2f4d2c]" />,
    title: 'Less Waste, Lower Cost',
    description:
      'Reduce overflows and minimize unnecessary pickups with efficient smart scheduling.',
  },
  {
    icon: <FaTruckMoving size={36} className="text-[#2f4d2c]" />,
    title: 'Fuel-Efficient Pickups',
    description:
      'Our smart routing algorithms help reduce fuel use and carbon emissions.',
  },
  {
    icon: <FaChartLine size={36} className="text-[#2f4d2c]" />,
    title: 'Real-Time Monitoring',
    description:
      'Track waste levels and pickup status instantly from your dashboard.',
  },
  {
    icon: <FaAward size={36} className="text-[#2f4d2c]" />,
    title: 'ESG & Compliance Ready',
    description:
      'Support for sustainability reports and waste documentation aligned with ESG goals.',
  },
  {
    icon: <FaGlobeAfrica size={36} className="text-[#2f4d2c]" />,
    title: 'Cleaner Communities',
    description:
      'Improve public hygiene and trust with cleaner, better-managed environments.',
  },
]

export default function Benefits() {
  return (
    <section
      className="py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#e7f3e4' }} // Warm green
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[#2f4d2c] text-center mb-12"
      >
        Why Choose supaCare Smart Waste?
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-[#2f4d2c] mb-1">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
