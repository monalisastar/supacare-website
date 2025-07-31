'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const groups = [
  {
    title: 'Apartments & Estates',
    image: '/images/recycling and composting/apartments.png',
  },
  {
    title: 'Schools & Institutions',
    image: '/images/recycling and composting/Schools.png',
  },
  {
    title: 'Markets & Vendors',
    image: '/images/recycling and composting/market.png',
  },
  {
    title: 'Farms & Gardeners',
    image: '/images/recycling and composting/farmer.jpg',
  },
];

export default function WhoWeServe() {
  return (
    <section className="px-4 py-16" style={{ backgroundColor: '#e5f7eb' }}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Who We Serve</h2>
        <p className="mt-2 text-gray-600">
          Supacare partners with diverse communities to drive composting across urban and rural spaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {groups.map((group, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <div className="relative w-full h-56">
              <Image
                src={group.image}
                alt={group.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-green-700">{group.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
