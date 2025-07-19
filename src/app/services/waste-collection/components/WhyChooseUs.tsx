'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  FileCheck2,
  Zap,
  Leaf,
  ScrollText,
  Building2,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Trained Waste Handlers',
    desc: 'Our team is equipped and certified to handle all types of waste safely.',
  },
  {
    icon: FileCheck2,
    title: 'Licensed & Compliant',
    desc: 'We operate under NEMA & county regulations, ensuring full legal compliance.',
  },
  {
    icon: Zap,
    title: 'Fast Response',
    desc: 'Quick turnaround for both scheduled and emergency pickups.',
  },
  {
    icon: Leaf,
    title: 'Environmental Focus',
    desc: 'Eco-first disposal and sorting policies to minimize landfill impact.',
  },
  {
    icon: ScrollText,
    title: 'Traceable Documentation',
    desc: 'Every pickup comes with proper manifests and traceability.',
  },
  {
    icon: Building2,
    title: 'Trusted by Estates',
    desc: 'We serve estates, schools, and corporates across Kenya.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#f7fdf8] py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2b402e] mb-4">
          Why Choose supaCare
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Here’s why estates, institutions, and businesses trust us for reliable, eco-compliant waste collection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <item.icon
              className="mx-auto text-[#2b402e] mb-4"
              size={40}
              strokeWidth={2}
            />
            <h3 className="text-xl font-semibold text-[#2b402e] mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
