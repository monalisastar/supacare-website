"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

type ProjectType = {
  title: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  tag: {
    name: string;
    emoji: string;
  };
};

const projects: ProjectType[] = [
  {
    title: "Tree Planting for Watershed Restoration – Kiambu",
    location: "Kiambu, Kenya",
    description:
      "Restoring degraded landscapes with native tree species along rivers and hills.",
    image: "/images/tree-planting-kiambu.png",
    slug: "tree-planting-kiambu",
    tag: { name: "Climate", emoji: "♻️" },
  },
  {
    title: "Urban Sanitation Drive – Nairobi",
    location: "Nairobi, Kenya",
    description:
      "Street-level cleanup and sanitation campaign involving local youth and vendors.",
    image: "/images/urban-sanitation-nairob.png",
    slug: "urban-sanitation-nairobi",
    tag: { name: "Sanitation", emoji: "🧼" },
  },
  {
    title: "Carbon Footprint Audit for SMEs",
    location: "Peri-urban Kenya",
    description:
      "Helping small businesses measure and reduce emissions through direct audits.",
    image: "/images/me-carbon-audit.png",
    slug: "sme-carbon-audit",
    tag: { name: "Business", emoji: "📊" },
  },
  {
    title: "Waste Sorting in highschools",
    location: "Nyeri County, Kenya",
    description:
      "Eco-education with student-led waste management using color-coded bins.",
    image: "/images/school-waste-sorting.png",
    slug: "waste-sorting-mahiga",
    tag: { name: "Sanitation", emoji: "🧼" },
  },
  {
    title: "Recycling & Composting Hub Pilot",
    location: "Murang'a, Kenya",
    description:
      "Piloting local solutions for plastic separation, composting, and community education.",
    image: "/images/solution-recycling-composting.png",
    slug: "recycling-composting-hub",
    tag: { name: "Climate", emoji: "♻️" },
  },
  {
    title: "Plastic-Free Market Initiative – Mombasa",
    location: "Mombasa, Kenya",
    description:
      "Partnering with vendors to eliminate single-use plastics in local markets.",
    image: "/images/plastic-free-mombasa.png",
    slug: "plastic-free-mombasa",
    tag: { name: "Sanitation", emoji: "🧼" },
  },
];

const ITEMS_PER_PAGE = 3;
const tags = ["All", "Climate", "Sanitation", "Business"];

const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [activeTag, setActiveTag] = useState("All");

  const filteredProjects =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tag.name === activeTag);

  const paginatedProjects = filteredProjects.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">
          Featured Projects
        </h2>

        {/* Tag Filter */}
        <div className="flex justify-center flex-wrap gap-3 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setCurrentPage(0);
              }}
              className={`px-4 py-1 border rounded-full text-sm ${
                activeTag === tag
                  ? "bg-green-600 text-white"
                  : "border-green-400 text-green-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {paginatedProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded bg-green-100 hover:bg-green-200 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                p < Math.floor(filteredProjects.length / ITEMS_PER_PAGE)
                  ? p + 1
                  : p
              )
            }
            disabled={
              currentPage >= Math.floor(filteredProjects.length / ITEMS_PER_PAGE)
            }
            className="px-4 py-2 rounded bg-green-100 hover:bg-green-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectList;
