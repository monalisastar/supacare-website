// src/app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import BlogCard from "@/components/BlogCard";
import Sidebar from "@/components/Sidebar";
import HeroHeader from "@/components/HeroHeader";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function fetchAllBlogs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(fileContents);

      // Ensure coverImage always starts with a slash for local images
      let coverImage = data.coverImage || "";
      if (coverImage && !coverImage.startsWith("/") && !coverImage.startsWith("http")) {
        coverImage = `/${coverImage}`;
      }

      return {
        title: data.title || "Untitled",
        slug: file.replace(/\.mdx$/, ""),
        excerpt: data.excerpt || "",
        publishedAt: data.publishedAt || "",
        author: data.author || "",
        coverImage,
      };
    });
}

export default function BlogPage() {
  const blogs = fetchAllBlogs();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50 px-4 py-10">
      <HeroHeader />

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>

        {/* Sidebar */}
        <Sidebar blogs={blogs} />
      </section>
    </main>
  );
}
