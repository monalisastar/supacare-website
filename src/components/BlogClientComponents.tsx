'use client';

import React, { useMemo } from "react";
import Image from "next/image";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import ReadingProgress from "./ReadingProgress";
import ShareButtons from "./ShareButtons";
import TableOfContents from "./TableOfContents";
import BlogImage from "./BlogImage";
import BlogQuote from "./BlogQuote";
import CallToAction from "./CallToAction";

interface Props {
  slug: string;
  title: string;
  coverImage?: string;
  author?: string;
  publishedAt?: string;
  content: MDXRemoteSerializeResult;
  rawContent: string;
}

// -------------------- Utility --------------------
const getReadingTime = (text: string) =>
  Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

// -------------------- MDX Components --------------------
const mdxComponents = {
  h1: (props: any) => <h1 {...props} className="text-3xl md:text-4xl font-bold mt-8 mb-4" />,
  h2: (props: any) => <h2 {...props} className="text-2xl md:text-3xl font-semibold mt-6 mb-3" />,
  h3: (props: any) => <h3 {...props} className="text-xl md:text-2xl font-semibold mt-4 mb-2" />,
  p: (props: any) => <p {...props} className="leading-relaxed mb-4" />,
  ul: (props: any) => <ul {...props} className="list-disc list-inside mb-4" />,
  ol: (props: any) => <ol {...props} className="list-decimal list-inside mb-4" />,
  li: (props: any) => <li {...props} className="mb-2" />,
  a: (props: any) => <a {...props} className="text-green-700 font-semibold hover:text-green-800" />,
  blockquote: (props: any) => <blockquote {...props} className="border-l-4 border-green-700 pl-4 italic my-4" />,
  img: (props: any) => <BlogImage {...props} />,
  BlogImage,
  BlogQuote,
  CallToAction,
};

// -------------------- Component --------------------
export default function BlogClientComponents({
  slug,
  title,
  coverImage,
  author,
  publishedAt,
  content,
  rawContent,
}: Props) {
  const readingTime = useMemo(() => getReadingTime(rawContent), [rawContent]);

  const resolvedCoverImage = useMemo(() => {
    if (!coverImage) return undefined;
    return coverImage.startsWith("/")
      ? coverImage
      : `/images/blogs/${slug}/${coverImage}`;
  }, [coverImage, slug]);

  return (
    <>
      <ReadingProgress />

      {/* Hero Section */}
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
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black/40 via-black/60 to-black/80 text-white">
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

      {/* Main Content */}
      <main className="bg-gradient-to-b from-green-50 via-green-100 to-green-50">
        <div className="max-w-7xl mx-auto px-6 py-14 flex gap-8">
          {/* Table of Contents */}
          <aside className="hidden xl:block w-64 sticky top-24 self-start">
            <TableOfContents content={rawContent} />
          </aside>

          {/* MDX Content */}
          <article className="prose prose-lg prose-green max-w-3xl flex-1 transition prose-headings:scroll-mt-20">
            <MDXRemote {...content} components={mdxComponents} />
          </article>
        </div>

        {/* Share Section */}
        <section className="max-w-7xl mx-auto px-6 mt-14 border-t pt-8">
          <p className="font-semibold text-green-800 mb-4">Share this article:</p>
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`}
            title={title}
          />
        </section>

        {/* Author Info */}
        {author && (
          <section className="max-w-7xl mx-auto px-6 mt-14 p-6 bg-white shadow rounded-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-gray-300 shadow flex items-center justify-center" />
            <div>
              <p className="font-semibold text-lg text-green-900">{author}</p>
              <p className="text-sm text-gray-600">
                Passionate writer sharing insights on technology & design.
              </p>
            </div>
          </section>
        )}

        {/* Related Articles */}
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <h3 className="text-xl font-bold text-green-900 mb-4">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white shadow rounded-xl">Coming soon…</div>
            <div className="p-4 bg-white shadow rounded-xl">Coming soon…</div>
          </div>
        </section>
      </main>
    </>
  );
}
