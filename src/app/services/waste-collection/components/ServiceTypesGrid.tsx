'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const wasteTypes = [
  {
    name: 'Domestic Waste',
    image: '/images/waste-collection/domestic-waste.webp',
  },
  {
    name: 'Commercial Waste',
    image: '/images/waste-collection/commercial-waste.webp',
  },
  {
    name: 'Institutional Waste',
    image: '/images/waste-collection/institutional-waste.webp',
  },
  {
    name: 'Organic Waste',
    image: '/images/waste-collection/organic-waste.webp',
  },
  {
    name: 'E-Waste',
    image: '/images/waste-collection/e-waste.webp',
  },
  {
    name: 'Hazardous Waste',
    image: '/images/waste-collection/hazardous-waste.webp',
  },
];

export default function ServiceTypesGrid() {
  return (
    <section className="w-full bg-[#f7fdf8] py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2b402e] mb-4">
          Waste Types We Handle
        </h2>
        <p className="text-gray-600 text-lg">
          Our services cover all major waste streams for homes, institutions, and businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {wasteTypes.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-60 sm:h-64">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="bg-white text-center py-4 px-3">
              <h3 className="text-xl font-semibold text-[#2b402e]">{item.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
