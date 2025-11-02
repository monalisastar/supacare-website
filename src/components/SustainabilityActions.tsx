'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRecycle, FaLeaf, FaHandsHelping } from 'react-icons/fa';
import React from 'react';

export default function SustainabilityActions() {
  const supacareYellow = '#f5b942';
  const actions = [
    {
      label: 'Start your Composting Journey',
      icon: <FaRecycle className="text-green-700 w-8 h-8 mb-3" />,
      title: 'Measure Your Waste Impact',
      description:
        'Use our Smart-Waste system to track collection, monitor volumes, and identify areas to reduce waste across your community or organization.',
      button: 'Start Tracking',
      href: '/services/smart-waste',
    },
    {
      label: 'Become Nature Positive',
      icon: <FaLeaf className="text-green-700 w-8 h-8 mb-3" />,
      title: 'Get Supacare Compost',
      description:
        'Purchase nutrient-rich Supacare compost for your gardens, farms, or landscaping projects — improving soil health and reducing landfill waste.',
      button: 'Buy Compost',
      href: '/shop',
    },
    {
      label: 'Implement Sustainable Strategies',
      icon: <FaHandsHelping className="text-green-700 w-8 h-8 mb-3" />,
      title: 'Book a Consultation',
      description:
        'Partner with our experts to start composting in your estate, school, or market — we provide training, setup, and ongoing support.',
      button: 'Partner with Us',
      href: '/contact',
    },
  ];

  return (
    <section
      id="sustainability-actions"
      aria-label="Sustainability actions and community programs by Supacare"
      className="relative z-[15] bg-gradient-to-b from-[#f7fbf8] via-white/95 to-[#eaf7ec] pt-12 pb-10 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {actions.map((item, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-300 p-6 text-center flex flex-col justify-between hover:-translate-y-1 border border-green-100"
            aria-label={item.title}
          >
            <div>
              <p
                className="text-xs font-semibold mb-2 uppercase tracking-wide"
                style={{ color: supacareYellow }}
              >
                {item.label}
              </p>
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                {item.title}
              </h3>
              <p className="text-green-800 text-sm leading-relaxed text-justify mb-5">
                {item.description}
              </p>
            </div>

            <Link
              href={item.href}
              className="inline-block border text-sm font-medium tracking-wide px-5 py-1.5 rounded-full transition-all duration-300"
              style={{
                borderColor: supacareYellow,
                color: supacareYellow,
              }}
              aria-label={`${item.button} — ${item.title}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = supacareYellow;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = supacareYellow;
              }}
            >
              {item.button}
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Soft fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-[#eaf7ec]" />
    </section>
  );
}
