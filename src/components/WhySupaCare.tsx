'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaHandsHelping, FaLeaf, FaRecycle } from 'react-icons/fa'

const impactStats = [
  {
    icon: <FaRecycle className="text-white text-xl" />,
    label: 'Tons of Waste Diverted',
    value: '8,200+',
  },
  {
    icon: <FaHandsHelping className="text-white text-xl" />,
    label: 'Community Members Engaged',
    value: '25,000+',
  },
  {
    icon: <FaLeaf className="text-white text-xl" />,
    label: 'Clean-Up Events Organized',
    value: '470+',
  },
]

const testimonials = [
  {
    name: 'Jane Mwikali',
    quote: 'SupaCare helped us set up a zero-waste system that actually works.',
    title: 'Sustainability Lead, EcoMart',
  },
  {
    name: 'David Otieno',
    quote: 'Thanks to SupaCare, our ESG reporting has improved significantly.',
    title: 'Operations Manager, FreshUrban',
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
          Why SupaCare Works
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
              <p className="text-base sm:text-sm font-semibold">{stat.value}</p>
              <p className="text-xs text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-5 mb-5">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 p-3 sm:p-4 rounded-lg backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <p className="italic text-sm leading-tight mb-2">“{item.quote}”</p>
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-xs text-white/60">{item.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 opacity-85">
          <Image src="/images/logo1.png" width={80} height={32} alt="Partner 1" />
          <Image src="/images/logo2.png" width={80} height={32} alt="Partner 2" />
          <Image src="/images/logo3.png" width={80} height={32} alt="Freelancers Palace" />
        </div>
      </div>
    </section>
  )
}

export default WhySupaCare
