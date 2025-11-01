'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'Smart Waste Tracking',
    location: 'Nairobi, Kenya',
    description:
      'Piloting IoT-based waste bins to monitor collection and improve routing efficiency in urban communities.',
    image: '/images/waste-tracking.png',
  },
  {
    title: 'Carbon Advisory & Environmental Consultancy',
    location: 'Kisumu, Kenya',
    description:
      'Community engagement on LPG, E-Jikos, and household carbon savings with token-based incentives.',
    image: '/images/clean-cooking.png',
  },
  {
    title: 'Circular Composting Pilot',
    location: 'Kiambu County',
    description:
      'Turning market and household waste into compost to support regenerative farming.',
    image: '/images/composting-pilot.png',
  },
]

export default function Projects() {
  return (
    <section className="relative z-20 -mt-[100px] bg-gradient-to-b from-[#c8efc9] via-[#bfeec6] to-[#e6f5ea] py-20 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-6"
        >
          <h2 className="text-4xl font-bold text-[#1b4332] mb-2 tracking-tight">
            What We’re Doing
          </h2>
          <p className="text-gray-800 text-base sm:text-lg max-w-2xl">
            We deliver programs that combine community action and eco-friendly innovation.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="w-full bg-white/90 backdrop-blur-md border border-green-100 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="relative h-72 sm:h-80 rounded-t-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-[#1b4332] text-white px-4 py-2 text-sm font-semibold">
                🇰🇪 {project.title}
              </div>

              <div className="p-4 text-left text-sm text-gray-800">
                <p className="font-medium text-[#1b4332]">{project.location}</p>
                <p className="mt-1">{project.description}</p>
                <Link
                  href="/projects"
                  className="mt-2 inline-block text-[#e0ac00] font-semibold hover:underline"
                >
                  View Project →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-left">
          <Link href="/projects">
            <button className="bg-[#fcbf49] text-white font-medium px-6 py-2 rounded-full hover:bg-[#e0ac00] text-sm transition shadow-lg">
              View All Projects
            </button>
          </Link>
        </div>
      </div>

      {/* ✅ Smooth gradient fade into Why Supacare Works */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-b from-transparent via-[#e6f5ea]/80 to-[#e6f5ea]" />
    </section>
  )
}
