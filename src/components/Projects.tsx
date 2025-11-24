'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'Smart Waste Tracking',
    location: 'Nairobi, Kenya',
    description:
      'Piloting IoT-based waste bins to monitor collection and improve routing efficiency in urban communities.',
    image: '/images/waste-tracking.webp',
  },
{
  title: 'Carbon Advisory & Environmental Consultancy',
  location: 'Kisumu, Kenya',
  description:
    'Community engagement on clean energy access and carbon-saving solutions, supporting household transitions to low-emission technologies.',
  image: '/images/solar project carbon consultancy.jpg',
},

  {
    title: 'Circular Composting Pilot',
    location: 'Kiambu County',
    description:
      'Turning market and household waste into compost to support regenerative farming.',
    image: '/images/composting-pilot.webp',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Supacare Ongoing Projects"
      className="relative z-20 -mt-[100px] bg-gradient-to-b from-[#FFFDE7] via-[#E6F7D3] to-[#C8E6C9] bg-[length:250%_250%] animate-sunlight py-20 px-6 sm:px-12 overflow-hidden"
    >
      {/* 🟨 Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-[#F4B940] z-[5]" />

      {/* ☀️ Sunlight Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(255,255,200,0.3),_transparent_70%)] animate-sunbeam pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-left mb-8"
        >
       <h2 className="text-3xl sm:text-4xl font-bold text-[#F4B940] mb-3 tracking-tight">
  Our Work in Action
      </h2>

          <p className="text-gray-800 text-base sm:text-lg max-w-2xl">
            We deliver programs that combine community action and eco-friendly innovation.
          </p>
        </motion.header>

        {/* Project Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-md border border-green-100 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              aria-label={`${project.title} in ${project.location}`}
            >
              {/* Project Image */}
              <div className="relative h-64 sm:h-72 rounded-t-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} – ${project.location}`}
                  fill
                  loading="lazy"
                  decoding="async"
                  quality={70}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Project Info */}
              <div className="bg-[#1b4332] text-white px-4 py-2 text-sm font-semibold">
                🇰🇪 {project.title}
              </div>

              <div className="p-5 text-left text-gray-800 flex flex-col flex-grow">
                <p className="font-medium text-[#1b4332] text-sm sm:text-base">
                  {project.location}
                </p>
                <p className="mt-2 text-sm sm:text-[15px] flex-grow">
                  {project.description}
                </p>

                <Link
                  href="/projects"
                  className="mt-3 inline-block text-[#e0ac00] font-semibold text-sm hover:underline"
                  aria-label={`View more details about ${project.title}`}
                >
                  View Project →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-left">
          <Link href="/projects" aria-label="View all Supacare projects">
            <button className="bg-[#fcbf49] text-white font-medium px-6 py-2 rounded-full hover:bg-[#e0ac00] text-sm transition shadow-lg">
              View All Projects
            </button>
          </Link>
        </div>
      </div>

      {/* 🌄 Soft Fade to Next Section */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-b from-transparent via-[#E8F5E9]/70 to-[#E6F5EA]" />
    </section>
  );
}
