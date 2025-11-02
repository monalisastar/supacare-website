'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const subtitles = [
  'Be part of the sustainability revolution.',
  'Build a greener future with us.',
  'Innovate waste and carbon solutions.',
];

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  // Rotate subtitles
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Detect header height (not just nav row)
  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector('header') as HTMLElement | null;
      if (header) setNavbarHeight(header.offsetHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center text-white overflow-hidden pt-[7rem]" // fallback padding
      style={{
        backgroundImage: "url('/images/joinourteam.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        marginTop: `${navbarHeight}px`, // ensures Hero starts below fixed navbar
        paddingBottom: '4rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 opacity-50 md:opacity-40 backdrop-blur-sm md:backdrop-blur-0 pointer-events-none"></div>

      {/* Hero Content */}
      <motion.div
        className="relative max-w-3xl z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Join Our Team
        </h1>

        <motion.p
          key={subtitleIndex}
          className="text-lg md:text-xl mb-8 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {subtitles[subtitleIndex]}
        </motion.p>

        <a
          href="#open-positions"
          className="inline-block px-8 py-3 bg-white text-green-900 font-semibold rounded shadow hover:bg-green-100 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
        >
          View Open Positions
        </a>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-6 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#open-positions" aria-label="Scroll down">
          <svg
            className="w-6 h-6 text-white opacity-80 hover:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
