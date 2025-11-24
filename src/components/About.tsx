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
    'To deliver integrated environmental, sustainability, and waste management solutions that support climate resilience, promote circular economies, and help organizations meet global ESG and compliance standards.',

  vision:
    'To be a leading provider of environmental, sustainability, and carbon solutions across Africa—empowering communities, businesses, and institutions with innovative systems that drive measurable climate impact and long-term ecological stewardship.',
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
      aria-label="About Supacare Solutions"
      className="relative bg-gradient-to-b from-[#fdfcf5] via-[#e6f7d3] to-[#d0e6b3] pt-24 md:pt-16 pb-12 overflow-hidden"
    >
      {/* ☀️ Sunbeam Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,200,0.35),_transparent_70%)] pointer-events-none animate-sunbeam" />

      {/* 🌿 Subtle Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-300/20 blur-3xl rounded-full -z-10" />

      {/* 🪴 Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 items-center gap-10 relative z-10">
        {/* LEFT: Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="z-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-8">
            SUPACARE AT A GLANCE
          </h2>

          {/* Mission Section */}
          <div className="space-y-2 mb-6">
            <button
              onClick={() => !isMobile && setMissionOpen(!isMissionOpen)}
              aria-expanded={isMissionOpen}
              aria-controls="mission-panel"
              className="flex items-center gap-2 text-[#e6a500] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-green-700 rounded-md"
            >
              <motion.div
                animate={{ rotate: isMissionOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Target className="w-5 h-5" aria-hidden="true" />
              </motion.div>
              <h3 className="text-lg font-semibold">Our Mission</h3>
            </button>

            <motion.div
              id="mission-panel"
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

          {/* Vision Section */}
          <div className="space-y-2">
            <button
              onClick={() => !isMobile && setVisionOpen(!isVisionOpen)}
              aria-expanded={isVisionOpen}
              aria-controls="vision-panel"
              className="flex items-center gap-2 text-[#e6a500] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-green-700 rounded-md"
            >
              <motion.div
                animate={{ rotate: isVisionOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-5 h-5" aria-hidden="true" />
              </motion.div>
              <h3 className="text-lg font-semibold">Our Vision</h3>
            </button>

            <motion.div
              id="vision-panel"
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

          {/* CTA Button */}
          <Link
            href="/about-us"
            aria-label="Learn more about Supacare Solutions"
            className="inline-block mt-10 bg-green-700 text-white font-medium px-8 py-3 rounded-full hover:bg-green-800 hover:-translate-y-1 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Read More About Us
          </Link>
        </motion.div>

        {/* RIGHT: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute bottom-[-60px] right-[-40px] w-[500px] h-[500px] bg-green-900/20 blur-[100px] rounded-full -z-10"></div>

          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] translate-y-4 md:translate-y-8 translate-x-4 md:translate-x-8">
            <Image
              src={data.image}
              alt="Supacare sustainability globe representation"
              fill
              loading="lazy"
              decoding="async"
              quality={70}
              className="object-cover rounded-full border-[8px] border-white/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
            />
          </div>
        </motion.div>
      </div>

      {/* 🌄 Fade to Next Section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#dcefdf]/90 to-[#1a331d]" />
    </section>
  );
}
