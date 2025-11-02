'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type AboutData = {
  image: string;
  mission: string;
  vision: string;
};

const fallbackData: AboutData = {
  image: '/images/about-bg.webp',
  mission:
    'To provide sustainable and affordable waste management solutions that promote a clean, healthy, and eco-friendly environment for all.',
  vision:
    'To be a leading force in Africa’s green transition by pioneering innovative, responsible waste management systems that protect the environment and drive circular economies.',
};

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMissionOpen, setMissionOpen] = useState(true);
  const [isVisionOpen, setVisionOpen] = useState(true);
  const [data] = useState<AboutData>(fallbackData);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Always show mission & vision on mobile
      setMissionOpen(true);
      setVisionOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="about"
      className="relative mt-0 md:-mt-[110px] bg-gradient-to-b from-[#FFFDE7] via-[#E6F7D3] to-[#D0E6B3] pt-20 md:pt-10 pb-0 md:pb-2 overflow-visible"
    >
      {/* ☀️ Sunbeam Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,200,0.35),_transparent_70%)] animate-sunbeam pointer-events-none" />

      {/* 💫 Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 items-center gap-10 relative z-10">
        {/* 🌿 LEFT: Mission + Vision Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="z-20"
        >
          {/* Mission */}
          <div className="space-y-2 mb-6">
            <button
              onClick={() => !isMobile && setMissionOpen(!isMissionOpen)}
              aria-expanded={isMissionOpen}
              className="flex items-center gap-2 text-[#f6a100] font-semibold text-lg"
            >
              <motion.div
                animate={{ rotate: isMissionOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Target className="w-5 h-5" />
              </motion.div>
              Our Mission
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isMissionOpen ? 'auto' : 0,
                opacity: isMissionOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden text-gray-700 leading-relaxed text-justify"
            >
              <p>{data.mission}</p>
            </motion.div>
          </div>

          {/* Vision */}
          <div className="space-y-2">
            <button
              onClick={() => !isMobile && setVisionOpen(!isVisionOpen)}
              aria-expanded={isVisionOpen}
              className="flex items-center gap-2 text-[#f6a100] font-semibold text-lg"
            >
              <motion.div
                animate={{ rotate: isVisionOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-5 h-5" />
              </motion.div>
              Our Vision
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isVisionOpen ? 'auto' : 0,
                opacity: isVisionOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden text-gray-700 leading-relaxed text-justify"
            >
              <p>{data.vision}</p>
            </motion.div>
          </div>

          {/* CTA */}
          <Link
            href="/about-us"
            className="inline-block mt-8 bg-green-700 text-white font-medium px-6 py-3 rounded-full hover:bg-green-800 transition-all duration-300 shadow-lg shadow-green-700/20"
          >
            Read More About Us
          </Link>
        </motion.div>

        {/* 🌍 RIGHT: Image */}
        <div className="relative z-0 flex justify-center items-center">
          <div className="absolute bottom-[-80px] right-[-60px] w-[600px] h-[600px] bg-green-900/20 blur-[120px] rounded-full -z-10"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative isolate"
          >
            <div className="relative w-[320px] h-[320px] md:w-[520px] md:h-[520px] translate-y-6 md:translate-y-12 translate-x-6 md:translate-x-10">
              <Image
                src={data.image}
                alt="Supacare sustainability globe image"
                fill
                loading="lazy"
                decoding="async"
                quality={70}
                className="object-cover rounded-full border-[8px] border-white/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🌄 Fade to Next Section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#DCEFE0]/90 to-[#1a331d] z-0"></div>
    </section>
  );
}
