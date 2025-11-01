"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  MapPin,
  FileText,
  Send,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";

const steps = [
  {
    icon: <FileSearch size={28} />,
    title: "Initial Client Assessment",
    desc: "We start by understanding your organization's environmental goals, compliance needs, and project scope.",
  },
  {
    icon: <MapPin size={28} />,
    title: "Site Visit & Data Review",
    desc: "Our consultants conduct field inspections and review existing data to assess environmental impact parameters.",
  },
  {
    icon: <FileText size={28} />,
    title: "EIA/ESG Report Drafting",
    desc: "We prepare comprehensive Environmental Impact Assessment (EIA) or ESG reports aligned with local and international standards.",
  },
  {
    icon: <Send size={28} />,
    title: "Submission & NEMA Review",
    desc: "Reports are submitted to the National Environment Management Authority (NEMA) and other relevant bodies for evaluation.",
  },
  {
    icon: <CheckCircle2 size={28} />,
    title: "Approval & Licensing",
    desc: "Supacare facilitates client representation and ensures that all required approvals and licenses are obtained.",
  },
  {
    icon: <RefreshCcw size={28} />,
    title: "Continuous Compliance Monitoring",
    desc: "We provide ongoing audits, site monitoring, and advisory support to maintain compliance and sustainability performance.",
  },
];

export default function ProcessFlowConsultancy() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-800 mb-14"
        >
          Environmental & Climate Consultancy Process
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
