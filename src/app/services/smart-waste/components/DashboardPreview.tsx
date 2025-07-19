'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DashboardPreview() {
  return (
    <section
      className="py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#e7f3e4' }} // Warm green background
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#2f4d2c]">
          Your Smart Waste Dashboard
        </h2>
        <p className="mt-4 text-gray-700 text-lg">
          Visualize waste levels, pickup efficiency, and environmental impact in real time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg"
      >
        <Image
          src="/images/smart-waste/dashboardui.webp"
          alt="Smart Waste Dashboard"
          width={1200}
          height={700}
          className="w-full h-auto object-cover"
          priority
        />
      </motion.div>
    </section>
  )
}
