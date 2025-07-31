'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const headlines = [
  "Transform Waste into Growth with Supacare",
  "Compost Today for Greener Communities",
  "Smart Waste Solutions for Every Space",
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
      <Image
        src="/images/recycling and composting/Supacarecompactmachine.png"
        alt="Supacare Composting Machine"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-3xl md:text-5xl font-bold max-w-4xl"
        >
          {headlines[index]}
        </motion.h1>

        <p className="text-white mt-4 max-w-xl text-base md:text-lg">
          Empowering homes, estates, and institutions through sustainable composting.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <Link
            href="/contact?service=compost"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition"
          >
            Book Composting Service
          </Link>
          <Link
            href="/composting-machines"
            className="bg-white text-green-800 hover:bg-gray-100 font-semibold py-2 px-5 rounded-lg transition"
          >
            Request a Machine
          </Link>
        </div>
      </div>
    </section>
  );
}


