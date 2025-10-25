'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Project = {
  title: string
  location: string
  description: string
  image: string
  focus?: string // custom focal point for each image
}

const projects: Project[] = [
  {
    title: 'Smart Waste Tracking',
    location: 'Nairobi, Kenya',
    description:
      'Piloting IoT-based waste bins to monitor collection and improve routing efficiency in urban communities.',
    image: '/images/waste-tracking.png',
    focus: 'object-center', // good as is
  },
  {
    title: 'Carbon Advisory & Environmental Consultancy',
    location: 'Kisumu, Kenya',
    description:
      'Community engagement on LPG, E-Jikos, and household carbon savings with token-based incentives.',
    image: '/images/clean-cooking.png',
    focus: 'object-[50%_40%]', // shift slightly upward (show pot + face)
  },
  {
    title: 'Circular Composting Pilot',
    location: 'Kiambu County',
    description:
      'Turning market and household waste into compost to support regenerative farming.',
    image: '/images/composting-pilot.png',
    focus: 'object-[50%_45%]', // reveal more bucket and hands
  },
]

export default function Projects() {
  return (
    <section className="relative z-20 -mt-[40px] bg-gradient-to-b from-[#e6f5ea] via-[#d8f1dc] to-[#bfeec6] py-12 px-3 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-20">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1b4332] mb-2">
          What We’re Doing
        </h2>
        <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto">
          We deliver programs that combine community action and eco-friendly innovation.
        </p>

        {/* 🌿 Project Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="w-full bg-white/80 backdrop-blur-lg border border-green-100 rounded-lg shadow-md hover:shadow-lg transition"
              >
                {/* ✅ Fine-tuned Image */}
                <div className="relative h-72 sm:h-80 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover ${project.focus}`}
                  />
                </div>

                {/* Title */}
                <div className="bg-[#1b4332] text-white px-4 py-2 text-sm font-semibold">
                  🇰🇪 {project.title}
                </div>

                {/* Details */}
                <div className="p-4 text-left text-xs sm:text-sm text-gray-800">
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
        </div>

        {/* 🌿 View All Button */}
        <div className="mt-10">
          <Link href="/projects">
            <button className="bg-[#fcbf49] text-white font-medium px-6 py-2 rounded-full hover:bg-[#e0ac00] text-sm transition shadow-lg">
              View All Projects
            </button>
          </Link>
        </div>
      </div>

      {/* 🌿 Decorative gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#bfeec6]/60 to-green-950/70 z-0" />
    </section>
  )
}
