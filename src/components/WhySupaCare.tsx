'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaHandsHelping, FaLeaf, FaRecycle } from 'react-icons/fa'
import CountUp from 'react-countup'

const impactStats = [
  {
    icon: <FaRecycle className="text-white text-xl" />,
    label: 'Tons of Waste Diverted',
    value: 8200,
    suffix: '+',
  },
  {
    icon: <FaHandsHelping className="text-white text-xl" />,
    label: 'Community Members Engaged',
    value: 25000,
    suffix: '+',
  },
  {
    icon: <FaLeaf className="text-white text-xl" />,
    label: 'Clean-Up Events Organized',
    value: 470,
    suffix: '+',
  },
]

const WhySupaCare = () => {
  return (
    <section className="relative z-10 -mt-[120px] py-14 text-white overflow-hidden">
      {/* 🌿 Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/for-communities.webp"
          alt="Supacare community initiative"
          fill
          priority
          className="object-cover brightness-[0.8] contrast-[1.05] saturate-[1.08]"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 📊 Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-8 text-center drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Supacare Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 shadow-md hover:bg-white/15 transition border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mb-2 flex justify-center">{stat.icon}</div>
              <p className="text-lg sm:text-xl font-semibold">
                <CountUp
                  end={stat.value}
                  duration={2}
                  suffix={stat.suffix}
                  enableScrollSpy
                />
              </p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🌿 Bottom Fade (seamless with partners section) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#E9FCE9]/95 to-[#E9FCE9] z-[5]" />
    </section>
  )
}

export default WhySupaCare
