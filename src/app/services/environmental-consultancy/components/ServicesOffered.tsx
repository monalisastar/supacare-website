"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const services = [
  {
    title: "Environmental Impact Assessments",
    image: "/images/environmental consultancy/eia-service.webp",
    alt: "EIA service fieldwork",
  },
  {
    title: "Waste & Sanitation Management",
    image: "/images/solution-cleanup-audit.png",
    alt: "Waste audit in urban setting",
  },
  {
    title: "Regulatory Advisory & Compliance",
    image: "/images/environmental consultancy/compliance-advice.webp",
    alt: "Compliance consultant with documents",
  },
  {
    title: "Sustainable Resource Planning",
    image: "/images/solution-recycling-composting.png",
    alt: "Composting or recycling center",
  },
  {
    title: "School & Community Waste Audits",
    image: "/images/school-waste-sorting.png",
    alt: "School waste sorting activity",
  },
  {
    title: "Carbon Footprint Assessment",
    image: "/images/carbon-advisory/carbon-definition.webp",
    alt: "Carbon assessment process",
  },
  {
    title: "Emission Reduction Planning",
    image: "/images/carbon-advisory/reduction-plan.webp",
    alt: "Carbon reduction planning session",
  },
];

const ServicesOffered = () => {
  return (
    <section className="bg-[#e6f4ea] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2e3e30] mb-6">
          What We Offer
        </h2>
        <p className="text-[#2e3e30] mb-12 max-w-2xl mx-auto">
          Supacare’s environmental consultancy team delivers expert assessments, community-based solutions, and forward-looking strategies tailored for Kenya’s unique context.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={service.image}
                  alt={service.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                  priority
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#2e3e30]">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA for Carbon Advisory */}
        <div className="mt-12">
          <Link
            href="/services/carbon-advisory"
            className="inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-800 transition"
          >
            Explore Carbon Advisory Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOffered;
