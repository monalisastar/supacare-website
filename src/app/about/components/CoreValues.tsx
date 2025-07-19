"use client";

import { motion } from "framer-motion";
import {
  RotateCw,
  Users,
  Globe,
  Hammer,
} from "lucide-react";

const values = [
  {
    title: "Circular Innovation",
    description:
      "We close the loop — turning waste into value through regenerative systems.",
    icon: RotateCw,
    color: "text-green-600",
  },
  {
    title: "Community First",
    description:
      "People are our priority. We design with dignity, not just delivery.",
    icon: Users,
    color: "text-green-700",
  },
  {
    title: "Climate Justice",
    description:
      "We fight inequity while fighting carbon — fairness and impact go together.",
    icon: Globe,
    color: "text-green-800",
  },
  {
    title: "Practical Action",
    description:
      "We work on the ground with scalable, real-world tools — no fluff.",
    icon: Hammer,
    color: "text-green-900",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-green-50 py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">
          What Drives Us
        </h2>
        <p className="text-green-900 mt-4 max-w-xl mx-auto">
          These values guide every SupaCare decision — from the bins we place to
          the futures we imagine.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {values.map(({ title, description, icon: Icon, color }) => (
          <motion.div
            key={title}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white backdrop-blur-sm rounded-xl shadow-lg p-6 cursor-pointer border border-green-100"
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
