import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import BlogClientComponents from "@/components/BlogClientComponents";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// Generate static paths for all MDX files
export async function generateStaticParams() {
  const slugsFromMDX = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));

  return slugsFromMDX;
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params; // ✅ await params
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return {};

  const file = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(file);

  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: data.coverImage ? [data.coverImage] : [],
    },
  };
}

// Blog post page
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; // ✅ await params

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);

  return (
    <BlogClientComponents
      slug={slug}
      title={data.title}
      coverImage={data.coverImage}
      author={data.author}
      publishedAt={data.publishedAt}
      content={content}
    />
  );
}
