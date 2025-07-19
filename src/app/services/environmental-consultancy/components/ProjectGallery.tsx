"use client";

import Image from "next/image";
import React from "react";

const projects = [
  {
    title: "Urban Cleanup & Audit, Nairobi",
    image: "/images/solution-cleanup-audit.png",
    tag: "🧼 Sanitation",
  },
  {
    title: "Composting for Circular Economy",
    image: "/images/solution-recycling-composting.png",
    tag: "♻️ Waste Management",
  },
  {
    title: "School Waste Sorting ",
    image: "/images/school-waste-sorting.png",
    tag: "🏫 Education",
  },
  {
    title: "Tree Planting in Kiambu County",
    image: "/images/tree-planting-kiambu.png",
    tag: "🌳 Biodiversity",
  },
];

const ProjectGallery = () => {
  return (
    <section className="bg-[#e6f4ea] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2e3e30] text-center mb-10">
          Case Studies & Community Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="relative w-full h-60">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                  priority
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-green-700 mb-2">{project.tag}</p>
                <h3 className="text-lg font-semibold text-[#2e3e30] mb-2">
                  {project.title}
                </h3>
                <button className="text-sm text-[#4a9f74] hover:underline">
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
