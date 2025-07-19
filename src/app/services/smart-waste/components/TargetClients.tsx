'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clients = [
  {
    title: 'Apartment Complexes',
    img: '/images/smart-waste/apartmentcomplex.webp',
  },
  {
    title: 'Office Parks & Commercial Blocks',
    img: '/images/smart-waste/officecommplexwithbins.webp',
  },
  {
    title: 'Municipal Collection Centers',
    img: '/images/smart-waste/municipal collection-center.webp',
  },
  {
    title: 'Industrial Facilities',
    img: '/images/smart-waste/industrialzoneswithorganizedbins.webp',
  },
]

export default function TargetClients() {
  return (
    <section
      className="py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#e7f3e4' }} // Warm green
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[#2f4d2c] text-center mb-12"
      >
        Who We Serve
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <div className="relative w-full h-56 md:h-64">
              <Image
                src={client.img}
                alt={client.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="bg-gray-100 p-4">
              <h3 className="text-lg font-semibold text-[#2f4d2c]">
                {client.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
