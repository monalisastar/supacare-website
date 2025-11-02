'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Anthony M.',
    role: 'Estate Manager, Nairobi',
    quote:
      'Since we started composting with Supacare, our estate has reduced food waste by 70%. The compost is perfect for our gardens, and the process is clean and odor-free.',
    image: '/images/recycling and composting/estatemanager.webp',
  },
  {
    name: 'Mama Achieng',
    role: 'Smallholder Farmer, Siaya',
    quote:
      'Supacare’s compost is the best I’ve used. My kale and tomatoes are thriving, and I spend less on fertilizers now. I’m proud to be part of the composting movement.',
    image: '/images/recycling and composting/farmer.webp',
  },
];

export default function Testimonials() {
  return (
    <section className="px-4 py-10 md:py-14" style={{ backgroundColor: '#e5f7eb' }}>
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">What Our Partners Say</h2>
        <p className="mt-1 text-gray-600 text-sm md:text-base">
          Real impact, real voices — how Supacare composting is changing lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-4 md:p-5 rounded-xl shadow flex flex-col md:flex-row gap-3 md:gap-4"
          >
            <div className="relative w-full md:w-32 h-32 md:h-32 rounded overflow-hidden flex-shrink-0">
              <Image
                src={t.image}
                alt={t.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div>
              <p className="text-gray-700 italic mb-2 text-sm md:text-base">“{t.quote}”</p>
              <p className="text-green-700 font-semibold text-sm">{t.name}</p>
              <p className="text-xs md:text-sm text-gray-500">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
