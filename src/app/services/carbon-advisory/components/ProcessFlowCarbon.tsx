"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  FileSignature,
  BarChart3,
  ShieldCheck,
  Award,
  Users,
} from "lucide-react";

const steps = [
  {
    icon: <FileSearch size={28} />,
    title: "Baseline Study & Feasibility",
    desc: "We begin by conducting detailed baseline studies to determine emission sources, reduction potential, and project feasibility.",
  },
  {
    icon: <FileSignature size={28} />,
    title: "Project Registration",
    desc: "We prepare documentation and register projects under recognized global carbon standards such as Verra or Gold Standard.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Monitoring & Data Collection",
    desc: "Our field and digital tools track project performance, ensuring accurate data on emission reductions and co-benefits.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Verification by Standard Bodies",
    desc: "Independent accredited auditors verify project results and confirm compliance with carbon accounting methodologies.",
  },
  {
    icon: <Award size={28} />,
    title: "Issuance of Carbon Credits",
    desc: "Upon successful verification, carbon credits are issued to the project owner within the registry platform.",
  },
  {
    icon: <Users size={28} />,
    title: "Revenue Sharing with Communities",
    desc: "Supacare ensures equitable benefit-sharing by directing proceeds to participating communities and stakeholders.",
  },
];

export default function ProcessFlowCarbon() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-800 mb-14"
        >
          Carbon Project Development Process
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
              {/* Circular Icon */}
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-600 to-yellow-400 text-white shadow-lg mb-4">
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {step.title}
              </h3>

              {/* Description */}
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
