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
    <section className="relative z-20 -mt-[30px] py-4 px-3 bg-gradient-to-b from-[#edf9ef] via-[#f8fcf9] to-white overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-base font-semibold text-green-800 mb-0.5 tracking-tight">
          Community Voices
        </h2>
        <p className="text-gray-700 text-[11px] mb-3">
          Real stories from those empowered by Supacare.
        </p>

        {/* Testimonial Card */}
        <div className="relative h-[90px] sm:h-[85px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 mx-auto max-w-xs bg-white/90 backdrop-blur-sm border border-green-100 rounded-md shadow-sm p-2.5 text-left hover:shadow-md hover:border-green-300 transition-all"
            >
              {/* ⭐ Stars */}
              <div className="flex gap-0.5 text-yellow-400 text-[9px] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={9} fill="currentColor" stroke="none" />
                ))}
              </div>

              {/* 💬 Quote */}
              <p className="text-[11px] text-gray-800 italic leading-snug mb-1">
                “{testimonials[index].quote}”
              </p>

              {/* 👤 Author */}
              <div className="text-green-900 font-semibold text-[11px] leading-tight">
                {testimonials[index].name}
              </div>
              <div className="text-[9.5px] text-gray-600">
                {testimonials[index].role}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* soft fade transition */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-white" />
    </section>
  )
}
