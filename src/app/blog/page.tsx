// src/app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import SEO from "@/components/SEO";
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

      let coverImage = data.coverImage || "";
      if (
        coverImage &&
        !coverImage.startsWith("/") &&
        !coverImage.startsWith("http")
      ) {
        coverImage = `/${coverImage}`;
      }

      return {
        title: data.title || "Untitled",
        slug: file.replace(/\.mdx$/, ""),
        excerpt: data.excerpt || "",
        publishedAt: data.publishedAt || "",
        author: data.author || "Supacare Editorial Team",
        coverImage,
      };
    });
}

export default function BlogPage() {
  const blogs = fetchAllBlogs();

  // Flatten for schema injection
  const articleSchema = blogs.map((b) => ({
    "@type": "Article",
    headline: b.title,
    description: b.excerpt,
    author: { "@type": "Person", name: b.author },
    publisher: {
      "@type": "Organization",
      name: "Supacare Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://www.supacaresolutions.com/images/supalogo.png",
      },
    },
    datePublished: b.publishedAt,
    image: b.coverImage
      ? `https://www.supacaresolutions.com${b.coverImage}`
      : "https://www.supacaresolutions.com/images/supalogo.png",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.supacaresolutions.com/blog/${b.slug}`,
    },
  }));

  return (
    <>
      {/* ✅ SEO Meta + Article Schema */}
      <SEO
        title="Supacare Blog | Sustainability, Waste Management & Carbon Insights"
        description="Explore sustainability insights, carbon market trends, clean cooking innovations, and waste management success stories from Supacare Solutions."
        url="https://www.supacaresolutions.com/blog"
        keywords={[
          "Supacare blog",
          "sustainability Kenya",
          "carbon markets Africa",
          "clean cooking Kenya",
          "waste management news",
          "environmental consultancy articles",
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Supacare Blog",
          description:
            "Sustainability insights and carbon advisory stories by Supacare Solutions.",
          publisher: {
            "@type": "Organization",
            name: "Supacare Solutions",
            logo: {
              "@type": "ImageObject",
              url: "https://www.supacaresolutions.com/images/supalogo.png",
            },
          },
          blogPost: articleSchema,
        }}
      />

      {/* ✅ Page Layout */}
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50 px-4 py-10 mt-[6rem] text-black">
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
    </>
  );
}
