'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type AboutData = {
  image: string
  whoTitle: string
  whoDescription: string
  mission: string
  vision: string
}

const fallbackData: AboutData = {
  image: '/images/about-bg.webp',
  whoTitle: 'Who We Are',
  whoDescription:
    'Supacare is a sustainability-driven waste management and environmental consultancy company committed to creating a cleaner, greener future. We empower homes, estates, schools, and institutions to reduce their environmental footprint, promote circular waste solutions, and take climate-positive action.',
  mission:
    'To provide sustainable and affordable waste management solutions that promote a clean, healthy, and eco-friendly environment for all.',
  vision:
    'To be a leading force in Africa’s green transition by pioneering innovative, responsible waste management systems that protect the environment and drive circular economies.',
}

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMissionOpen, setMissionOpen] = useState(true)
  const [isVisionOpen, setVisionOpen] = useState(true)
  const [data] = useState<AboutData>(fallbackData)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setMissionOpen(!mobile)
      setVisionOpen(!mobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="about"
      className="relative -mt-[110px] md:-mt-[120px] bg-[#eaf7ec] pt-6 pb-0 md:pb-2 overflow-hidden"
    >
      {/* Decorative gradient behind image */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300/20 blur-3xl rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* LEFT TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="z-20"
        >
          <h5 className="text-[#f6a100] font-semibold uppercase mb-2 tracking-wide">
            {data.whoTitle}
          </h5>

          <p className="text-green-800 text-lg leading-relaxed mb-8">
            {data.whoDescription}
          </p>

          {/* Mission */}
          <div className="space-y-2 mb-4">
            <button
              onClick={() => setMissionOpen(!isMissionOpen)}
              className="flex items-center gap-2 text-[#f6a100] font-semibold text-lg"
            >
              <motion.div
                animate={{ rotate: isMissionOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Target className="w-5 h-5" />
              </motion.div>
              Our Mission
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isMissionOpen ? 'auto' : 0,
                opacity: isMissionOpen ? 1 : 0,
              }}
              className="overflow-hidden text-gray-700 leading-relaxed"
            >
              <p>{data.mission}</p>
            </motion.div>
          </div>

          {/* Vision */}
          <div className="space-y-2">
            <button
              onClick={() => setVisionOpen(!isVisionOpen)}
              className="flex items-center gap-2 text-[#f6a100] font-semibold text-lg"
            >
              <motion.div
                animate={{ rotate: isVisionOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-5 h-5" />
              </motion.div>
              Our Vision
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isVisionOpen ? 'auto' : 0,
                opacity: isVisionOpen ? 1 : 0,
              }}
              className="overflow-hidden text-gray-700 leading-relaxed"
            >
              <p>{data.vision}</p>
            </motion.div>
          </div>

          {/* CTA */}
          <Link
            href="/about-us"
            className="inline-block mt-8 bg-green-700 text-white font-medium px-6 py-3 rounded-full hover:bg-green-800 transition-all duration-300"
          >
            Read More About Us
          </Link>
        </motion.div>

        {/* RIGHT IMAGE SIDE */}
        <div className="relative z-0 flex justify-center items-center pointer-events-none">
          <div className="absolute bottom-[-80px] right-[-60px] w-[600px] h-[600px] bg-green-900/20 blur-[120px] rounded-full -z-10"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, y: -10 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative isolate"
          >
            <div className="relative w-[320px] h-[320px] md:w-[520px] md:h-[520px] translate-y-10 md:translate-y-16 translate-x-6 md:translate-x-10">
              <Image
                src={data.image}
                alt="Supacare sustainability globe"
                fill
                className="object-cover rounded-full border-[8px] border-white/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle fade transition at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#eaf7ec]/90 to-[#1a331d] z-0"></div>
    </section>
  )
}
