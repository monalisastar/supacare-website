'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { UserCheck, Leaf, ShieldCheck, ChevronsDown } from 'lucide-react';

export default function SustainabilityBanner() {
  return (
    <section className="w-full bg-[#f0fdf4] py-10 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text + Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-800 space-y-6 order-2 md:order-1"
        >
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 leading-tight">
              Compact Composting with <span className="text-green-600"></span> Supacare
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Transform your food and organic waste into valuable compost with our  compact machine — ideal for apartments, estates, and urban hubs. Easy, odor-free, and sustainable.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition duration-300"
            >
              Book a Demo
            </Link>
          </div>

          {/* Animated Feature Cards */}
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <FeatureCard
              icon={<UserCheck className="w-6 h-6 text-green-700 animate-bounce" />}
              title="Community-Ready"
              description="Ideal for estates, apartments & urban settings."
            />
            <FeatureCard
              icon={<Leaf className="w-6 h-6 text-green-700 animate-spin-slow" />}
              title="Soil-Rich Output"
              description="Produces clean, high-quality compost from waste."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-green-700 animate-pulse" />}
              title="Hygienic & Compliant"
              description="Sealed, safe, and aligned with waste laws."
            />
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-md order-1 md:order-2"
        >
          <Image
            src="/images/recycling and composting/Supacarecompactmachine.png"
            alt="Supacare Compact Composting Machine"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            priority
          />
        </motion.div>
      </div>

      {/* Scroll Arrow */}
      <a href="#next-section" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-green-700 animate-bounce">
        <ChevronsDown className="w-6 h-6" />
      </a>
    </section>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ rotateY: 5, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      className="group bg-white p-4 rounded-xl shadow-md text-center space-y-2 text-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-center">{icon}</div>
      <h4 className="font-semibold text-green-800">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
