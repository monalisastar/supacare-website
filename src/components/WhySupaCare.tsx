'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHandsHelping, FaLeaf, FaRecycle } from 'react-icons/fa';
import CountUp from 'react-countup';

const impactStats = [
  {
    icon: <FaRecycle className="text-white text-2xl sm:text-3xl" />,
    label: 'Tons of Waste Diverted',
    value: 20,
    suffix: '+',
  },
  {
    icon: <FaHandsHelping className="text-white text-2xl sm:text-3xl" />,
    label: 'Community Members Engaged',
    value: 1000,
    suffix: '+',
  },
  {
    icon: <FaLeaf className="text-white text-2xl sm:text-3xl" />,
    label: 'Carbon & Environmental Consultancy Engagements',
    value: 40,
    suffix: '+',
  },
];

export default function WhySupaCare() {
  return (
    <section
      id="why-supacare"
      aria-label="Why Supacare Works — measurable community and environmental impact"
      className="relative z-10 -mt-[120px] py-16 text-white overflow-hidden"
    >
      {/* 🌿 Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/for-communities.webp"
          alt="Supacare community clean-up and environmental initiative"
          fill
          loading="lazy"
          decoding="async"
          quality={70}
          sizes="100vw"
          className="object-cover brightness-[0.8] contrast-[1.05] saturate-[1.08]"
        />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      </div>

      {/* 📊 Content Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center drop-shadow-md text-[#fcbf49]"
        >
          Why Supacare Works
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
          {impactStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg border border-white/10 hover:bg-white/15 hover:shadow-xl transition-all duration-300"
              aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
            >
              <div className="mb-3 flex justify-center">{stat.icon}</div>
              <p className="text-2xl sm:text-3xl font-bold text-[#f5b942]">
                <CountUp end={stat.value} duration={2} suffix={stat.suffix} enableScrollSpy />
              </p>
              <p className="text-sm sm:text-base text-white/85 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🌿 Bottom Gradient Fade (transition to next section) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#E9FCE9]/95 to-[#E9FCE9] z-[5]" />
    </section>
  );
}
