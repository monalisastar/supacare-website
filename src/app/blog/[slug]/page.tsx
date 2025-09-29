import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";

import BlogClientWrapper from "@/components/BlogClientWrapper"; // ✅ wrapper with ssr: false

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function generateStaticParams() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return { title: "Blog Not Found" };

  try {
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
  } catch {
    return { title: "Blog Not Found" };
  }
}

export default async function BlogPostPage(
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();

  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);

  const mdxSource = await serialize(content);

  return (
    <BlogClientWrapper
      slug={slug}
      title={data.title || "Untitled"}
      coverImage={data.coverImage}
      author={data.author}
      publishedAt={data.publishedAt}
      content={mdxSource}
      rawContent={content}
    />
  );
}
