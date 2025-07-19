"use client";

import { motion } from "framer-motion";
import { FaHandsHelping, FaLeaf, FaRecycle } from "react-icons/fa";

const impactStats = [
  {
    icon: <FaRecycle className="text-white text-xl" />,
    label: "Tons of Waste Diverted",
    value: "8,200+",
  },
  {
    icon: <FaHandsHelping className="text-white text-xl" />,
    label: "Community Members Engaged",
    value: "25,000+",
  },
  {
    icon: <FaLeaf className="text-white text-xl" />,
    label: "Clean-Up Events Organized",
    value: "470+",
  },
];

export default function ImpactSnapshot() {
  return (
    <section className="py-20 px-6 md:px-20 bg-green-50">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Impact in Numbers
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {impactStats.map(({ icon, label, value }, index) => (
          <motion.div
            key={label}
            className="bg-green-700 rounded-xl shadow-lg p-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4">{icon}</div>
            <p className="text-4xl font-extrabold text-white">{value}</p>
            <p className="text-white mt-2 text-center text-sm">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
