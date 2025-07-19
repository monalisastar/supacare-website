"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  tag?: { name: string; emoji: string };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  location,
  description,
  image,
  slug,
  tag,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg border border-green-100"
    >
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-green-800">{title}</h3>
          {tag && (
            <span
              className="text-sm px-2 py-1 bg-green-100 rounded-full text-green-800 ml-2 whitespace-nowrap"
              title={tag.name}
            >
              {tag.emoji}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        <Link
          href={`/projects/${slug}`}
          className="text-green-700 text-sm font-medium mt-3 inline-block hover:underline"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
