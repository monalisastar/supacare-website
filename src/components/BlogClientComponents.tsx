'use client';

import React from "react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import ReadingProgress from "./ReadingProgress";
import ShareButtons from "./ShareButtons";
import TableOfContents from "./TableOfContents";

// ✅ Custom MDX components
import BlogImage from "./BlogImage";
import BlogQuote from "./BlogQuote";
import CallToAction from "./CallToAction";

interface Props {
  slug: string;
  title: string;
  coverImage?: string;
  author?: string;
  publishedAt?: string;
  content: string;
}

// Reading time utility
function getReadingTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

// Combine standard HTML elements with custom MDX components
const mdxComponents = {
  h1: (props: any) => <h1 {...props} className="text-3xl md:text-4xl font-bold mt-8 mb-4" />,
  h2: (props: any) => <h2 {...props} className="text-2xl md:text-3xl font-semibold mt-6 mb-3" />,
  h3: (props: any) => <h3 {...props} className="text-xl md:text-2xl font-semibold mt-4 mb-2" />,
  p: (props: any) => <p {...props} className="leading-relaxed mb-4" />,
  ul: (props: any) => <ul {...props} className="list-disc list-inside mb-4" />,
  ol: (props: any) => <ol {...props} className="list-decimal list-inside mb-4" />,
  li: (props: any) => <li {...props} className="mb-2" />,
  a: (props: any) => <a {...props} className="text-green-700 font-semibold hover:text-green-800" />,
  blockquote: (props: any) => (
    <blockquote {...props} className="border-l-4 border-green-700 pl-4 italic my-4" />
  ),
  img: (props: any) => <BlogImage {...props} />,
  BlogImage,
  BlogQuote,
  CallToAction,
};

export default function BlogClientComponents({
  slug,
  title,
  coverImage,
  author,
  publishedAt,
  content,
}: Props) {
  const readingTime = getReadingTime(content);

  // Resolve hero image safely
  const resolvedCoverImage =
    coverImage?.startsWith("/")
      ? coverImage
      : coverImage
      ? `/images/blogs/${slug}/${coverImage}`
      : undefined;

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <header className="relative w-full h-96 md:h-[480px] overflow-hidden">
        {resolvedCoverImage && (
          <Image
            src={resolvedCoverImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-70 scale-105"
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 bg-gradient-to-b from-black/40 via-black/60 to-black/80">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl leading-snug">
            {title}
          </h1>
          <p className="text-sm md:text-base text-gray-200">
            {author && <>By {author} · </>}
            {publishedAt && new Date(publishedAt).toLocaleDateString()}
            {readingTime && ` · ${readingTime} min read`}
          </p>
        </div>
      </header>

      {/* Main Content: Two-column layout */}
      <main className="bg-gradient-to-b from-green-50 via-green-100 to-green-50">
        <div className="max-w-7xl mx-auto px-6 py-14 flex gap-8">
          {/* Left: Table of Contents */}
          <div className="hidden xl:block w-64 sticky top-24 self-start">
            <TableOfContents content={content} />
          </div>

          {/* Right: Blog Content */}
          <article className="prose prose-lg prose-green max-w-3xl flex-1 transition prose-headings:scroll-mt-20">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </div>

        {/* Share Buttons */}
        <div className="max-w-7xl mx-auto px-6 mt-14 border-t pt-8">
          <p className="font-semibold text-green-800 mb-4">Share this article:</p>
          <ShareButtons url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`} title={title} />
        </div>

        {/* Author Box */}
        {author && (
          <div className="max-w-7xl mx-auto px-6 mt-14 p-6 bg-white shadow rounded-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 shadow flex items-center justify-center"></div>
            <div>
              <p className="font-semibold text-lg text-green-900">{author || "Anonymous"}</p>
              <p className="text-sm text-gray-600">
                Passionate writer sharing insights on technology & design.
              </p>
            </div>
          </div>
        )}

        {/* Related Articles */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <h3 className="text-xl font-bold text-green-900 mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white shadow rounded-xl">Coming soon…</div>
            <div className="p-4 bg-white shadow rounded-xl">Coming soon…</div>
          </div>
        </div>
      </main>
    </>
  );
}
