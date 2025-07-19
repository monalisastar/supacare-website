'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-700 italic">
          “Thanks to SupaCare&apos;s smart system, our waste pickups are always on time, and our community has never looked cleaner.”
        </p>
        <p className="mt-4 font-semibold text-green-800">— Facility Manager</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md border-4 border-green-100">
          <Image
            src="/images/smart-waste/propertmanager.webp"
            alt="Client Testimonial Portrait"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </motion.div>
    </section>
  )
}
