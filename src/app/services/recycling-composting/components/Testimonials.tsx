'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Anthony M.',
    role: 'Estate Manager, Nairobi',
    quote:
      'Since we started composting with Supacare, our estate has reduced food waste by 70%. The compost is perfect for our gardens, and the process is clean and odor-free.',
    image: '/images/recycling and composting/estatemanager.png',
  },
  {
    name: 'Mama Achieng',
    role: 'Smallholder Farmer, Siaya',
    quote:
      'Supacare’s compost is the best I’ve used. My kale and tomatoes are thriving, and I spend less on fertilizers now. I’m proud to be part of the composting movement.',
    image: '/images/recycling and composting/farmer.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="px-4 py-16" style={{ backgroundColor: '#e5f7eb' }}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">What Our Partners Say</h2>
        <p className="mt-2 text-gray-600">
          Real impact, real voices — how Supacare composting is changing lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4"
          >
            <div className="relative w-full md:w-40 h-40 rounded overflow-hidden">
              <Image
                src={t.image}
                alt={t.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div>
              <p className="text-gray-700 italic mb-3">“{t.quote}”</p>
              <p className="text-green-700 font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
