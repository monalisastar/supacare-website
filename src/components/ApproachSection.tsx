'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ApproachSection() {
  return (
    <section
      className="relative w-full h-[65vh] flex items-center overflow-hidden bg-green-950 -mt-20 md:-mt-28 z-0"
    >
      {/* Background image */}
      <Image
        src="/images/composting-pilot.png"
        alt="Supacare composting initiative"
        fill
        className="object-cover brightness-[0.8] contrast-[1.05] saturate-[1.1] scale-105"
        priority
      />

      {/* Light top fade to blend with globe */}
      <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-[#eaf7ec]/90 via-[#eaf7ec]/40 to-transparent z-10"></div>

      {/* Subtle shadow under globe projection */}
      <div className="absolute -top-8 left-0 w-full h-24 bg-gradient-to-b from-black/10 via-green-900/20 to-transparent blur-2xl z-20"></div>

      {/* Text overlay (left aligned) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="relative z-30 text-left text-white max-w-3xl px-8 md:px-16 lg:px-24"
      >
        <p className="text-lg md:text-xl leading-relaxed text-gray-100 drop-shadow-md">
          We take a holistic approach to sustainability connecting waste management,
          composting, and community innovation. Supacare transforms waste into resources,
          empowering homes, schools, and institutions to build a circular, low-carbon economy.
        </p>
      </motion.div>

      {/* Softer bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-950/80 via-transparent to-transparent z-10"></div>
    </section>
  )
}
