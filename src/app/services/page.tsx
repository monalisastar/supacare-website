'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Carbon Advisory',
    description: 'Helping you navigate carbon markets and reduction strategies.',
    image: '/images/services/carbon-hero.webp',
    link: '/services/carbon-advisory',
  },
  {
    title: 'Carbon Footprint',
    description: 'Measure, reduce, and report your environmental impact.',
    image: '/images/services/footprint-overview.webp',
    link: '/services/carbon-footprint',
  },
  {
    title: 'Environmental Consultancy',
    description: 'Audits, cleanups, and sustainable action plans.',
    image: '/images/services/solution-cleanup-audit.webp',
    link: '/services/environmental-consultancy',
  },
  {
    title: 'Recycling & Composting',
    description: 'Practical recycling programs and compost site support.',
    image: '/images/services/composting-site.webp',
    link: '/services/recycling-composting',
  },
  {
    title: 'Smart Waste',
    description: 'IoT-powered bin monitoring and waste data dashboards.',
    image: '/images/services/dashboardui.webp',
    link: '/services/smart-waste',
  },
  {
    title: 'Waste Collection',
    description: 'Efficient domestic and industrial waste pickup solutions.',
    image: '/images/services/domestic-waste.webp',
    link: '/services/waste-collection',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#eaf5ec] text-gray-800">
      {/* Hero Intro */}
      <section className="text-center px-6 py-16 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-800 mb-4"
        >
          Explore Our Impactful Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          SupaCare empowers sustainability through hands-on solutions and innovative technology.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-20 max-w-7xl mx-auto">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <Link href={service.link}>
              <div className="relative h-52 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-900">{service.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                <span className="inline-block mt-4 text-green-700 hover:underline">
                  Learn more →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="bg-green-700 text-white py-10 text-center">
        <h3 className="text-2xl font-semibold mb-2">Need a custom quote?</h3>
        <p className="mb-4">Talk to our sustainability experts for a tailored solution.</p>
        <Link href="/contact">
          <button className="bg-white text-green-800 px-6 py-2 rounded-full font-medium shadow hover:bg-gray-100 transition">
            Contact Us
          </button>
        </Link>
      </section>
    </main>
  );
}
