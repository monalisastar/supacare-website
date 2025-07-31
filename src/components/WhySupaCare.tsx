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
    <section className="relative py-6 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/for-communities.png"
          alt="Background"
          fill
          priority
          className="object-cover brightness-[0.4]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-lg sm:text-xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Supacare Works
        </motion.h2>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-4">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mb-1">{stat.icon}</div>
              <p className="text-base sm:text-sm font-semibold">
                <CountUp end={stat.value} duration={2} suffix={stat.suffix} enableScrollSpy />
              </p>
              <p className="text-xs text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhySupaCare
