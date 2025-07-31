'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Supacare is reliable and responsive. They’ve transformed how we handle waste in our estate.',
    author: '— Property Manager, Greenhill',
  },
  {
    quote:
      'They are always on time and provide proper documentation after every pickup.',
    author: '— Admin, Eden Court',
  },
  {
    quote:
      'Their service is clean, professional, and fully compliant with county regulations.',
    author: '— School Operations Lead',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#f7fdf8] py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2b402e] mb-8">
          What Our Clients Say
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            <p className="mb-4 italic text-[#1e2f24]">❝ {testimonials[index].quote} ❞</p>
            <p className="text-sm text-[#2b402e] font-semibold">{testimonials[index].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
