'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/images/waste-collection/wastecollectionforoverviewcaurrosel.webp',
  '/images/waste-collection/supatruck.png',
];

export default function Overview() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 45000); // 45 seconds

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2b402e] mb-4">
            Professional Waste Handling You Can Trust
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Supacare offers reliable, timely, and compliant waste collection services
            for residential estates, corporate premises, schools, and institutions.
            Our waste handlers are fully trained and equipped to meet NEMA and county
            regulations, ensuring every pickup is safe and environmentally responsible.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether it’s organic, domestic, institutional, or commercial waste,
            we collect and transport it with precision — using licensed vehicles
            and proper documentation every step of the way.
          </p>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Waste Collection Image ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-700 ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
              priority={index === 0}
            />
          ))}

          {/* Manual Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
