"use client";

import { motion } from "framer-motion";
import {
  CloudFog,
  Heart,
  DollarSign,
  Users,
} from "lucide-react";

const reasons = [
  {
    title: "Climate Impact",
    description:
      "Waste produces methane and CO₂, potent greenhouse gases accelerating global warming.",
    icon: CloudFog,
    color: "text-green-700",
  },
  {
    title: "Public Health",
    description:
      "Improper waste disposal leads to disease spread, affecting vulnerable communities.",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Economic Loss",
    description:
      "Recyclable materials discarded as waste mean lost income and jobs for many.",
    icon: DollarSign,
    color: "text-yellow-600",
  },
  {
    title: "Social Dignity",
    description:
      "Empowering communities with proper waste management restores pride and safety.",
    icon: Users,
    color: "text-green-600",
  },
];

export default function WhyWasteMatters() {
  return (
    <section className="bg-green-50 py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">
          Why Waste Matters
        </h2>
        <p className="text-green-900 mt-4 max-w-xl mx-auto">
          Addressing waste is essential not only for the environment but also for
          community health, economic vitality, and social justice.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {reasons.map(({ title, description, icon: Icon, color }) => (
          <motion.div
            key={title}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-default border border-green-100"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className={`w-12 h-12 mb-4 ${color}`} />
            <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
            <p className="text-green-700 text-sm">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
