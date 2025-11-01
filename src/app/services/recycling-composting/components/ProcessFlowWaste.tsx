"use client";

import { motion } from "framer-motion";
import {
  Recycle,
  Leaf,
  ClipboardCheck,
  Package,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    icon: <Recycle size={28} />,
    title: "Waste Collection & Sorting",
    desc: "Collect organic waste from clients and partner institutions for processing.",
  },
  {
    icon: <Leaf size={28} />,
    title: "Composting Process",
    desc: "Convert organic waste into nutrient-rich compost using our circular composting model.",
  },
  {
    icon: <ClipboardCheck size={28} />,
    title: "Quality Testing",
    desc: "Analyze compost for nutrient content and maturity to ensure compliance with standards.",
  },
  {
    icon: <Package size={28} />,
    title: "Packaging & Distribution",
    desc: "Package and distribute compost to farmers or through Supacare’s green retail channels.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Impact Reporting",
    desc: "Measure methane reduction and report the circular-economy benefits of each project.",
  },
];

export default function ProcessFlowWaste() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-800 mb-14"
        >
          Sustainable Waste Management Process
        </motion.h2>

        <div className="flex flex-wrap justify-center items-start gap-10 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center w-60"
            >
              {/* Circle Icon */}
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-600 to-yellow-400 text-white shadow-lg mb-4">
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Connecting Line */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-full w-20 h-1 bg-gradient-to-r from-green-500 to-yellow-400 hidden md:block"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
