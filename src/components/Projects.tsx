'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Smart Waste Tracking',
    location: 'Nairobi, Kenya',
    description:
      'Piloting IoT-based waste bins to monitor collection and improve routing efficiency in urban communities.',
    image: '/images/waste-tracking.png',
  },
  {
    title: 'Carbon Advisory & Clean Cooking',
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
    <section className="bg-gradient-to-b from-[#e6f5ea] to-white py-6 sm:py-8 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1b4332] mb-2">
         What We’re Doing
        </h2>
        <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto">
          We deliver programs that combine community action and eco-friendly innovation.
        </p>

        {/* Mobile scroll slider */}
        <div className="mt-6 overflow-x-auto sm:overflow-visible">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-[700px] sm:min-w-0">
            {projects.map((project, index) => (
              <motion.a
                href="#"
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex-shrink-0 bg-white/80 backdrop-blur-lg border border-green-100 rounded-lg shadow-md hover:shadow-lg transition w-[280px] sm:w-auto"
              >
                <div className="h-48 sm:h-56 relative rounded-t-lg overflow-hidden">
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
                <div className="p-3 text-left text-xs sm:text-sm text-gray-800">
                  <p className="font-medium text-[#1b4332]">{project.location}</p>
                  <p className="mt-1">{project.description}</p>
                  <span className="mt-2 inline-block text-[#e0ac00] font-semibold hover:underline">
                    View Project →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <button className="bg-[#fcbf49] text-white font-medium px-5 py-2 rounded-full hover:bg-[#e0ac00] text-sm transition">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
