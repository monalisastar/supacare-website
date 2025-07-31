'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type BlogCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  coverImage: string;
};

export default function BlogCard({
  title,
  slug,
  excerpt,
  publishedAt,
  tags,
  coverImage,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-xl bg-white/30 backdrop-blur-md shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-white/20"
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">{publishedAt}</p>
          <p className="text-gray-800 text-sm mb-4">{excerpt}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full border border-green-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
