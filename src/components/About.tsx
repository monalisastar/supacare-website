'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMissionOpen, setMissionOpen] = useState(true);
  const [isVisionOpen, setVisionOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setMissionOpen(!mobile); // Auto-expand on desktop
      setVisionOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="next-section"
      className="w-full snap-start bg-[#eaf7ec] py-16"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        {/* 🌍 Left Image with Leafy Curve */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="overflow-hidden shadow-xl"
          style={{
            clipPath:
              "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)",
            filter: "drop-shadow(0 4px 8px rgba(34, 139, 34, 0.3))",
          }}
        >
          <Image
            src="/images/about-bg.png"
            alt="About Supacare"
            width={600}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
        </motion.div>

        {/* ✅ Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-gray-800 space-y-6"
        >
          {/* WHO WE ARE */}
          <div>
            <h2 className="text-3xl font-bold text-[#f6a100] mb-3">
              Who We Are
            </h2>
            <p className="text-base leading-relaxed">
              Supacare is a sustainability-driven waste management and environmental consultancy company
              committed to creating a cleaner, greener future. We empower businesses, communities, and
              institutions to reduce their environmental footprint and take climate-positive action.
              Our services include smart waste tracking, recycling, composting, carbon advisory, and
              sustainability education to promote long-term impact.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-blue-200 my-4" />

          {/* Mission */}
          <div className="space-y-2">
            <button
              onClick={() => setMissionOpen(!isMissionOpen)}
              className="flex items-center gap-2 text-[#f6a100] font-semibold text-lg transition-all"
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
              animate={{ height: isMissionOpen ? 'auto' : 0, opacity: isMissionOpen ? 1 : 0 }}
              className="overflow-hidden text-gray-700 text-sm leading-relaxed pr-2"
            >
              <p>
                To provide sustainable and affordable waste management solutions that promote a clean,
                healthy, and eco-friendly environment for all. We empower communities, businesses, and
                institutions to take climate-positive action through smart technology, recycling, and
                education.
              </p>
            </motion.div>
          </div>

          {/* Vision */}
          <div className="space-y-2">
            <button
              onClick={() => setVisionOpen(!isVisionOpen)}
              className="flex items-center gap-2 text-[#f6a100] font-semibold text-lg transition-all"
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
              animate={{ height: isVisionOpen ? 'auto' : 0, opacity: isVisionOpen ? 1 : 0 }}
              className="overflow-hidden text-gray-700 text-sm leading-relaxed pr-2"
            >
              <p>
                To be a leading force in Kenya’s waste management industry by pioneering innovative and
                responsible solutions that protect the environment and foster a circular economy. We
                envision a future where sustainability is embedded in every community’s daily life.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
