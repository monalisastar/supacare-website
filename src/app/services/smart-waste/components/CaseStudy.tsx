'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CaseStudy() {
  return (
    <section
      className="py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#e7f3e4' }} // Warm green background
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Column – Text & Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2f4d2c] mb-4">
            GreenView Estate: Before & After Supacare
          </h2>
          <p className="text-gray-700 mb-6">
            Through real-time bin tracking and optimized pickup schedules,
            GreenView Estate eliminated late collections, minimized odors, and
            improved residential cleanliness.
          </p>

          <Image
            src="/images/smart-waste/greenviewestate.webp"
            alt="GreenView Estate Map"
            width={500}
            height={300}
            className="rounded-md shadow-md"
          />
        </motion.div>

        {/* Right Column – Before & After */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/smart-waste/beforeandafter.webp"
            alt="Before and After Smart Waste"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}
