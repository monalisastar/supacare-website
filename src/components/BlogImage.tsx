"use client";

import Image from "next/image";

type BlogImageProps = {
  src: string;   // can be "hero.png" or "/images/blogs/slug/hero.png"
  slug?: string; // injected from BlogPage if only filename is given
  alt?: string;
  width?: number;
  height?: number;
};

export default function BlogImage({
  src,
  slug,
  alt = "Blog image",
  width = 1200,
  height = 675,
}: BlogImageProps) {
  // If src already looks like an absolute path, use it directly
  const isAbsolutePath = src.startsWith("/");
  const resolvedSrc = isAbsolutePath
    ? src
    : slug
    ? `/images/blogs/${slug}/${src}`
    : `/images/blogs/${src}`;

  return (
    <div className="my-8">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
      {alt && (
        <p className="text-sm text-gray-500 text-center mt-2">{alt}</p>
      )}
    </div>
  );
}
