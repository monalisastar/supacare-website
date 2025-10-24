"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function VisionForward() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* ✅ Full background image — fills the screen completely */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/the-road-ahead.png"
          alt="Asphalt road symbolizing the road ahead"
          fill
          priority
          className="object-cover object-center" // ✅ fills area fully
        />
        {/* Optional: gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-green-800/30 to-transparent" />
      </div>

      {/* ✅ Text content */}
      <motion.div
        className="max-w-3xl text-center px-6 md:px-0 z-10 bg-black/40 backdrop-blur-sm rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-200">
          The Road Ahead
        </h2>
        <p className="text-lg md:text-xl mb-4 leading-relaxed text-green-50">
          At Supacare, we envision a future where sustainable waste management
          is accessible to every community across Kenya and beyond. We will
          expand clean cooking initiatives, develop carbon credit programs, and
          harness smart waste technology to transform how waste becomes a
          resource.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-green-50">
          Our mission is to empower local innovators and leaders, building a
          resilient, circular economy that benefits people and planet alike.
          Together, we’re creating the blueprint for a greener, healthier
          tomorrow.
        </p>
      </motion.div>
    </section>
  );
}
