'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const headlines = [
  "Recycling Today for a Greener Tomorrow",
  "Compost to Empower Communities",
  "Smart Waste, Smart Future",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <video
        className="absolute w-full h-full object-cover"
        src="/videos/recyclingandcompostinghero.webm"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-3xl md:text-5xl font-bold text-center max-w-4xl"
        >
          {headlines[index]}
        </motion.h1>
      </div>
    </section>
  );
}

