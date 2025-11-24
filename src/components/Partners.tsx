'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Partners() {
  const partners = [
  {
  name: 'Eco-Mentor LMS',
  logo: '/images/ecomentor logo.jpg',
  alt: 'Eco-Mentor LMS Logo',
},
{
  name: 'Supacare Foundation',
  logo: '/images/ecomentor logo.jpg',
  alt: 'Kilimofresh',
},

  ];

  return (
    <section
      id="partners"
      aria-label="Supacare Partners and Collaborators"
      className="w-full bg-[#E9FCE9] border-t-4 border-[#F4B940] -mt-[32px] pt-14 pb-16 px-6 md:px-20 relative z-[10] overflow-hidden"
    >
      {/* 🌿 Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-left mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#F4B940] tracking-tight">
          Our Partners
        </h2>
        <div className="w-24 h-[3px] bg-[#1b4332] mt-3 mb-5 rounded-full" />
        <p className="text-gray-700 text-base sm:text-lg max-w-2xl leading-relaxed">
          We proudly collaborate with visionary organizations that share our
          mission of advancing sustainable waste management, carbon consultancy,
          and climate resilience across Africa.
        </p>
      </motion.header>

      {/* 🤝 Partner Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 md:gap-16 items-center justify-center max-w-6xl mx-auto">
        {partners.map((partner, i) => (
          <motion.figure
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <Image
              src={partner.logo}
              alt={partner.alt}
              width={180}
              height={100}
              loading="lazy"
              decoding="async"
              quality={75}
              className="object-contain grayscale hover:grayscale-0 transition duration-500 drop-shadow-md"
            />
            <figcaption className="mt-3 text-sm text-green-900 font-medium">
              {partner.name}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {/* 🌄 Bottom Fade Transition */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-[#E9FCE9]/95 to-white" />
    </section>
  );
}
