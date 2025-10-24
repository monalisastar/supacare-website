"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FocusAreas() {
  const areas = [
    {
      id: 1,
      title: "Sustainable Waste Management",
      description:
        "We transform kitchen refuse, organic waste, and market by-products from homes, hotels, and institutions into nutrient-rich compost. Our circular approach reduces methane emissions and supports regenerative agriculture.",
      button: "Learn about our composting model",
      href: "/services/recycling-composting",
    },
    {
      id: 2,
      title: "Carbon Project Development",
      description:
        "We develop verified carbon projects across diverse sectors — from waste and clean cooking to forestry, renewable energy, and agriculture — translating measurable emission reductions into high-integrity, tradable carbon credits under recognized global standards.",
      button: "Explore our carbon initiatives",
      href: "/services/carbon-advisory",
    },
    {
      id: 3,
      title: "Environmental & Climate Consultancy",
      description:
        "Our in-house experts and independent consultants provide EIA, ESG, and sustainability advisory services to help organizations align with Kenya’s NEMA guidelines and global environmental frameworks.",
      button: "Request consultancy",
      href: "/contacts",
    },
  ];

  const navbarColor = "#F4C542";

  return (
    <section className="relative z-20 -mt-32 md:-mt-40 px-6 md:px-20 pb-2 backdrop-blur-sm">
      {/* ✅ Softer gradient fade under hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-green-100 pointer-events-none" />

      {/* Header */}
      <div className="relative mb-16 text-left ml-4 md:ml-10">
        <h2
          className="text-3xl md:text-4xl font-bold drop-shadow-sm"
          style={{ color: navbarColor }}
        >
          Our Focus Areas
        </h2>
      </div>

      {/* Focus Area Cards */}
      <div className="relative grid md:grid-cols-3 gap-10">
        {areas.map((area) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: area.id * 0.1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-white/30 
                       bg-white/20 backdrop-blur-lg transition-all flex flex-col justify-between"
          >
            {/* Number badge */}
            <div
              className="absolute -top-6 left-6 text-white text-lg font-semibold rounded-full w-12 h-12 
                          flex items-center justify-center shadow-md border border-white/30"
              style={{
                backgroundColor: navbarColor,
                color: "#fff",
              }}
            >
              {area.id}
            </div>

            {/* Card content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-900 mt-6 mb-4 drop-shadow-sm">
                {area.title}
              </h3>
              <p className="text-gray-800 mb-8 leading-relaxed text-justify">
                {area.description}
              </p>
            </div>

            {/* Button */}
            <div className="mt-auto">
              <Link
                href={area.href}
                className="inline-block font-medium px-5 py-2 rounded-full backdrop-blur-md transition text-center"
                style={{
                  border: `2px solid ${navbarColor}`,
                  color: navbarColor,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    navbarColor;
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                  (e.currentTarget as HTMLElement).style.color = navbarColor;
                }}
              >
                {area.button}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
