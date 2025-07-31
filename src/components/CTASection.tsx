'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Recycle, Users, Gauge, Globe } from 'lucide-react'
import { useState } from 'react'

const ctaItems = [
  {
    title: 'Book a Waste Audit',
    subtitle: 'Assess your waste footprint with our audit & smart tracking',
    details: 'Includes site analysis, volume tracking, and regulatory reports.',
    icon: ClipboardCheck,
  },
  {
    title: 'Measure Your Impact',
    subtitle: 'Calculate your carbon footprint and get reduction strategies',
    details: 'Powered by our digital calculator and expert GHG consultants.',
    icon: Gauge,
  },
  {
    title: 'Start Recycling & Composting',
    subtitle: 'Implement recycling and composting solutions for your site',
    details: 'We design zero-waste models and supply sorting bins.',
    icon: Recycle,
  },
  {
    title: 'Join a Community Clean-Up',
    subtitle: 'Participate in Supacare-led community events & activations',
    details: 'Help restore your neighborhood and earn AERRA rewards.',
    icon: Users,
  },
  {
    title: 'Sustainability Consultancy',
    subtitle: 'Get expert guidance on ESG, reporting, and climate resilience',
    details: 'Includes SDG alignment, ESG audits, and sustainability strategy.',
    icon: Globe,
  },
]

export default function CTASection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="pt-4 sm:pt-6 pb-8 sm:pb-10 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {ctaItems.map((item, i) => {
            const Icon = item.icon
            const isActive = hoveredIndex === i

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group p-4 sm:p-5 rounded-xl border backdrop-blur-lg transition overflow-hidden
                  ${
                    isActive
                      ? 'bg-green-700 text-white shadow-xl'
                      : 'bg-white/70 text-green-800 hover:bg-green-600 hover:text-white'
                  }`}
              >
                {/* Icon Circle */}
                <div className="flex justify-center mb-3">
                  <div
                    className={`rounded-full p-2 border-2 transition-all ${
                      isActive
                        ? 'border-white bg-white/10 shadow-lg'
                        : 'border-green-300 bg-white/20'
                    }`}
                  >
                    <Icon
                      size={26}
                      className={`${
                        isActive ? 'text-white' : 'text-green-700'
                      } transition`}
                    />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-center leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-center mt-1 leading-snug">
                  {item.subtitle}
                </p>

                {/* Hover Detail */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-green-800/90 text-white p-5 flex flex-col justify-center items-center text-xs sm:text-sm rounded-xl z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition"
                >
                  <p className="text-center max-w-xs">{item.details}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
