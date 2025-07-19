'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="bg-green-800 text-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make Waste Smarter?
          </h2>
          <p className="mb-6 text-lg">
            Book a site visit or request a smart waste audit with our team today.
          </p>
          <Link href="/contact">
            <button className="bg-white text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
              Start Your Smart Journey →
            </button>
          </Link>
        </motion.div>

        {/* Right: Agent Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-80 rounded-xl overflow-hidden shadow-md"
        >
          <Image
            src="/images/smart-waste/supacareagentwithtablet.webp"
            alt="SupaCare Agent with Tablet"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
