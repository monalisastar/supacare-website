'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/wastehero.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Warm Green Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#2b402e]/80 z-10 backdrop-blur-sm" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 sm:px-10">
        <motion.h1
          className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Reliable Waste Collection & Disposal
        </motion.h1>

        <motion.p
          className="text-white text-lg sm:text-xl mt-4 max-w-2xl drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Serving estates, businesses, and institutions across Kenya with eco-friendly waste handling.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="bg-white text-[#2b402e] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            Book Pickup
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-white hover:text-[#2b402e] transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
