'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sophia Kamau',
    role: 'Community Project Manager',
    quote:
      'Working with Supacare was transformative. Their climate-driven approach gave our community a new path forward.',
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
      'Supacare made it easy to align our mission with real carbon impact. I’d recommend them in a heartbeat.',
  },
]

export default function ImpactSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative z-20 bg-gradient-to-b from-[#e6f4e6] to-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-2 tracking-tight">
          Community Voices
        </h2>
        <p className="text-gray-700 text-sm sm:text-base mb-8">
          Real stories from individuals and communities impacted by Supacare.
        </p>

        <div className="relative h-[220px] sm:h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 mx-auto max-w-xl bg-white/80 backdrop-blur-md border border-green-100 rounded-xl shadow-md p-6 text-left hover:shadow-lg hover:border-green-300 transition-all"
            >
              <div className="flex gap-1 text-yellow-400 text-xs mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" stroke="none" />
                ))}
              </div>
              <p className="text-[15px] text-gray-800 italic leading-relaxed mb-3">
                “{testimonials[index].quote}”
              </p>
              <div className="text-green-900 font-semibold text-sm">
                {testimonials[index].name}
              </div>
              <div className="text-[12px] text-gray-600">
                {testimonials[index].role}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
