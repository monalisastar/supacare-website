'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const focusAreas = [
  {
    title: 'Sustainable Waste Management',
    desc: 'We transform organic waste into nutrient-rich compost and clean biomass energy — reducing landfill emissions and supporting regenerative agriculture.',
    image: '/images/recycling and composting/Supacarecompactmachine.webp',
    link: '/services/recycling-composting',
    label: 'Learn More About Sustainable Waste Management',
  },
  {
    title: 'Carbon Project Development',
    desc: 'We design and manage verified carbon projects across waste, energy, forestry, and agriculture sectors — translating measurable emission reductions into certified carbon credits.',
    image: '/images/carbon-advisory/carbon-hero.webp',
    link: '/services/carbon-advisory',
    label: 'Learn More About Carbon Project Development',
  },
  {
    title: 'Environmental & Climate Consultancy',
    desc: 'Our experts provide EIA, ESG, and sustainability advisory services to help organizations meet Kenya’s NEMA standards and align with global environmental frameworks.',
    image: '/images/environmental consultancy/eia-service.webp',
    link: '/services/environmental-consultancy',
    label: 'Learn More About Environmental & Climate Consultancy',
  },
]

export default function OurFocusAreas() {
  return (
    <section
      id="focus-areas"
      className="relative z-10 bg-gradient-to-b from-green-50 via-[#e6f5ea] to-[#c8efc9] pb-20 mb-[-60px] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#fcbf49] mb-6 text-left tracking-tight"
        >
          Our Core Areas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {focusAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-100 flex flex-col justify-between relative z-10"
            >
              <div className="relative w-full h-52">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 text-left flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                  {area.desc}
                </p>

                <Link
                  href={area.link}
                  className="inline-block self-start px-5 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition"
                >
                  Learn More
                  <span className="sr-only"> — {area.label}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
