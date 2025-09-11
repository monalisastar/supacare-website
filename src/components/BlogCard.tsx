// src/components/BlogCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt?: string;
  coverImage?: string | null; // MDX frontmatter
  author?: string;
};

// Helper to sanitize image URLs
function sanitizeImageUrl(url?: string | null) {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '/images/default-blog.png'; // fallback image in /public/images
  }
  // Ensure local paths start with a leading slash
  return url.startsWith('/') || url.startsWith('http') ? url : `/${url}`;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  author,
}: BlogPost) {
  const imageUrl = sanitizeImageUrl(coverImage);

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            className="group-hover:scale-105 transition-transform duration-300"
            // Optional: priority for faster loading of hero cards
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-700 mt-2 text-sm">
            {excerpt.length > 120 ? `${excerpt.slice(0, 120)}...` : excerpt}
          </p>
          {publishedAt && (
            <p className="text-gray-400 mt-2 text-xs">
              {new Date(publishedAt).toLocaleDateString()}
            </p>
          )}
          {author && <p className="text-gray-500 mt-1 text-xs">By {author}</p>}
        </div>
      </div>
    </Link>
  );
}
