'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Leaf, GraduationCap } from 'lucide-react'

const testimonials = [
  {
    name: 'Sophia Kamau',
    role: 'Community Project Manager',
    quote:
      'Working with SupaCare was transformative. Their climate-driven approach gave our community a new path forward.',
  },
  {
    name: 'James Muli',
    role: 'Environmental Analyst',
    quote:
      'Their professionalism and deep understanding of sustainability impressed me from day one.',
  },
  {
    name: 'Fatima Noor',
    role: 'Eco-Startup Founder',
    quote:
      'SupaCare made it easy to align our mission with real carbon impact. I’d recommend them in a heartbeat.',
  },
]

export default function ImpactSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative z-20 bg-gradient-to-b from-[#e6f4e6] to-white py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
        {/* Testimonials */}
        <div className="text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-1">
            What Our Partners Say
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm mb-4">
            Stories of impact and transformation.
          </p>
          <div className="relative h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-white/70 backdrop-blur-md border border-green-100 rounded-md shadow-sm p-4 text-left"
              >
                <div className="flex gap-1 text-yellow-400 text-xs mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="text-[13px] text-gray-800 italic leading-tight mb-2">
                  "{testimonials[index].quote}"
                </p>
                <div className="text-green-800 font-semibold text-xs">{testimonials[index].name}</div>
                <div className="text-[11px] text-gray-600">{testimonials[index].role}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-1 text-center lg:text-left">
            Our Partners
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm mb-4 text-center lg:text-left">
            We collaborate with mission-aligned organizations to deliver sustainable solutions.
          </p>

          <div className="grid gap-3">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white/70 backdrop-blur-md border border-green-100 shadow-sm rounded-lg p-3 text-left transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="text-green-700 animate-spinSlow" size={20} />
                <h3 className="text-sm font-semibold text-green-800">Kilimofresh</h3>
              </div>
              <p className="text-xs text-gray-700 leading-snug">
                Agritech Partner empowering fresh produce supply chains and regenerative farming.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white/70 backdrop-blur-md border border-green-100 shadow-sm rounded-lg p-3 text-left transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="text-green-700 animate-bounceOnce" size={20} />
                <h3 className="text-sm font-semibold text-green-800">Eco-Mentor</h3>
              </div>
              <p className="text-xs text-gray-700 leading-snug">
                Our climate education partner, leading in GHG training and sustainability learning.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
