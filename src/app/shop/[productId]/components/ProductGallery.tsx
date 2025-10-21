'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <Image
          src={selectedImage}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 overflow-x-auto mt-3 pb-1">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative w-24 h-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition ${
              selectedImage === img
                ? 'border-green-600'
                : 'border-transparent hover:border-green-400'
            }`}
          >
            <Image
              src={img}
              alt={`${alt} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
