'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaRecycle, FaLeaf, FaHandsHelping } from 'react-icons/fa'

export default function SustainabilityActions() {
  const navbarColor = '#f5b613' // matches your navbar

  const actions = [
    {
      label: 'Start your Composting journey',
      icon: <FaRecycle className="text-green-700 w-8 h-8 mb-3" />,
      title: 'Measure your Waste Impact',
      description:
        'Use our Smart-Waste system to track collection, monitor volumes, and identify areas to reduce waste across your community or organization.',
      button: 'Start Tracking',
      href: 'http://localhost:3000/services/smart-waste',
    },
    {
      label: 'Become nature positive',
      icon: <FaLeaf className="text-green-700 w-8 h-8 mb-3" />,
      title: 'Get Supacare Compost',
      description:
        'Purchase nutrient-rich Supacare compost for your gardens, farms, or landscaping projects — improving soil health and reducing landfill waste.',
      button: 'Buy Compost',
      href: '/shop',
    },
    {
      label: 'Implement sustainable strategies',
      icon: <FaHandsHelping className="text-green-700 w-8 h-8 mb-3" />,
      title: 'Book a Consultation',
      description:
        'Partner with our experts to start composting in your estate, school, or market — we provide training, setup, and ongoing support.',
      button: 'Partner with Us',
      href: '/contact',
    },
  ]

  return (
    <section className="-mt-44 lg:-mt-48 relative z-10 bg-gradient-to-b from-transparent via-white/90 to-[#eaf7ec] pt-16 pb-0 px-6 lg:px-12 backdrop-blur-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        {actions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.15)] transition-all duration-300 p-8 text-center flex flex-col items-center justify-between"
          >
            <div>
              <p
                className="text-sm font-semibold mb-2 uppercase tracking-wide"
                style={{ color: navbarColor }}
              >
                {item.label}
              </p>
              {item.icon}
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {item.title}
              </h3>
              <p className="text-green-800 mb-6">{item.description}</p>
            </div>
            <Link
              href={item.href}
              className="inline-block border text-sm font-medium tracking-wide px-6 py-2.5 rounded-full transition-all duration-300"
              style={{
                borderColor: navbarColor,
                color: navbarColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = navbarColor
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = navbarColor
              }}
            >
              {item.button}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Soft fade only to neutralize edge — not visible overlap */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-[#eaf7ec]"></div>
    </section>
  )
}
