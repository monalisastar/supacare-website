'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  const [offsetTop, setOffsetTop] = useState(0)

  useEffect(() => {
    const updateOffset = () => {
      const navbar = document.querySelector<HTMLElement>('[data-navbar]')
      if (navbar) {
        setOffsetTop(navbar.offsetHeight)
      }
    }

    // Run immediately on mount
    updateOffset()

    // Recalculate on resize
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  return (
    <section
      className="w-full py-16 px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10 transition-all"
      style={{ backgroundColor: '#e7f3e4', marginTop: offsetTop }}
    >
      {/* Left Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#2f4d2c] leading-tight">
          Smart Waste Management, Reinvented
        </h1>
        <p className="mt-4 text-lg text-[#3b5c35]">
          Real-time tracking. Lower emissions. Cleaner neighborhoods.
        </p>
        <Link href="/contact">
          <button className="mt-6 bg-white hover:bg-gray-100 text-[#4e7d3a] font-semibold py-3 px-6 rounded-full transition duration-300">
            Request a Smart Audit →
          </button>
        </Link>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md h-80 md:h-[24rem]"
      >
        <Image
          src="/images/smart-waste/smartbins.webp"
          alt="Smart Supacare Waste Bin"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </motion.div>
    </section>
  )
}
