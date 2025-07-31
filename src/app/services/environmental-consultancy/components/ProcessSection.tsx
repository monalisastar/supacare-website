"use client";

import React from "react";
import { MdContactPhone } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Inquiry & Consultation",
    description:
      "Clients reach out for a tailored consultation to understand project needs and timelines.",
    icon: <MdContactPhone size={40} className="text-[#4a9f74]" />,
  },
  {
    title: "On-Site Assessment",
    description:
      "We conduct a site visit and collect data through observation, interviews, and measurements.",
    icon: <FaMapMarkedAlt size={40} className="text-[#4a9f74]" />,
  },
  {
    title: "Reporting & Strategy",
    description:
      "Our experts compile findings into a compliant, actionable report with clear sustainability recommendations.",
    icon: <HiOutlineDocumentReport size={40} className="text-[#4a9f74]" />,
  },
  {
    title: "Follow-up & Support",
    description:
      "We provide continued guidance, monitoring, and implementation support after the report delivery.",
    icon: <BsPeopleFill size={40} className="text-[#4a9f74]" />,
  },
];

const ProcessSection = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2e3e30] mb-6">
          Our 4-Step Process
        </h2>
        <p className="text-[#2e3e30] max-w-2xl mx-auto mb-12">
          Supacare ensures every environmental consultancy engagement follows a proven, transparent process. Here’s how we support your sustainability journey from start to finish.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center bg-[#e6f4ea] rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#2e3e30] mb-2">
                {step.title}
              </h3>
              <p className="text-[#2e3e30] text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
