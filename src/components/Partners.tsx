'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Partners() {
  const partners = [
    {
      name: 'Eco-Mentor LMS',
      logo: '/images/eco-mentor-logo.webp',
    },
    {
      name: 'Supacare Foundation',
      logo: '/images/logo2.webp',
    },
  ]

  return (
    <section className="w-full bg-[#E9FCE9] border-t-4 border-[#F4B940] -mt-[32px] pt-10 pb-16 px-6 md:px-20 relative z-[10]">
      {/* 🌿 Left-Aligned Header */}
      <div className="text-left mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F4B940]">
          Our Partners
        </h2>
        <div className="w-24 h-[3px] bg-[#1b4332] mt-2 mb-4" />
        <p className="text-gray-700 text-lg max-w-2xl">
          We proudly collaborate with visionary organizations that share our
          mission of building sustainable, low-carbon communities across Africa.
        </p>
      </div>

      {/* 🤝 Partner Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 md:gap-16 items-center justify-center">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center"
          >
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={180}
              height={100}
              className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
