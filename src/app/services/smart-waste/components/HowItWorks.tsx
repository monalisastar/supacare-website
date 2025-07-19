'use client'

import { motion } from 'framer-motion'
import { FaMapMarkedAlt, FaChartBar, FaTrashRestoreAlt } from 'react-icons/fa'

const steps = [
  {
    icon: <FaTrashRestoreAlt size={36} className="text-[#2f4d2c]" />,
    title: 'Smart Bins & Sensors',
    description:
      'Our bins are equipped with fill-level sensors and GPS tracking for real-time data.',
  },
  {
    icon: <FaMapMarkedAlt size={36} className="text-[#2f4d2c]" />,
    title: 'Dynamic Routing',
    description:
      'We optimize pickup routes based on bin fill levels, reducing fuel use and emissions.',
  },
  {
    icon: <FaChartBar size={36} className="text-[#2f4d2c]" />,
    title: 'Insights Dashboard',
    description:
      'Clients get access to smart reports, trends, and waste optimization insights.',
  },
]

export default function HowItWorks() {
  return (
    <section
      className="py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#e7f3e4' }} // Softer warm green background
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[#2f4d2c] text-center mb-12"
      >
        How Smart Waste Works
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-[#2f4d2c] mb-2">
              {step.title}
            </h3>
            <p className="text-gray-700 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
