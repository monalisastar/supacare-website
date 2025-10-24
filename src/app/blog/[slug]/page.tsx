import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";

import SEO from "@/components/SEO";
import BlogClientWrapper from "@/components/BlogClientWrapper"; // ✅ wrapper with ssr: false

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// --- Generate all routes ---
export async function generateStaticParams() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

// --- Main Page ---
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();

  const file = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(file);

  const mdxSource = await serialize(content);

  const {
    title = "Untitled",
    excerpt = "",
    author = "Supacare Editorial Team",
    publishedAt,
    modifiedAt,
    coverImage,
  } = data;

  const canonicalUrl = `https://www.supacaresolutions.com/blog/${slug}`;
  const imageUrl = coverImage
    ? coverImage.startsWith("http")
      ? coverImage
      : `https://www.supacaresolutions.com${coverImage}`
    : "https://www.supacaresolutions.com/images/supalogo.png";

  return (
    <>
      {/* ✅ SEO + Article Schema */}
      <SEO
        title={`${title} | Supacare Blog`}
        description={excerpt}
        url={canonicalUrl}
        image={imageUrl}
        author={author}
        publishedTime={publishedAt}
        modifiedTime={modifiedAt}
        keywords={[
          "Supacare blog",
          "sustainability Kenya",
          "carbon market insights",
          "waste management Kenya",
          "clean cooking",
          "climate innovation Africa",
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: excerpt,
          author: {
            "@type": "Person",
            name: author,
          },
          publisher: {
            "@type": "Organization",
            name: "Supacare Solutions",
            logo: {
              "@type": "ImageObject",
              url: "https://www.supacaresolutions.com/images/supalogo.png",
            },
          },
          datePublished: publishedAt || new Date().toISOString(),
          dateModified: modifiedAt || publishedAt || new Date().toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
          image: imageUrl,
        }}
      />

      {/* ✅ Client wrapper rendering MDX content */}
      <BlogClientWrapper
        slug={slug}
        title={title}
        coverImage={coverImage}
        author={author}
        publishedAt={publishedAt}
        content={mdxSource}
        rawContent={content}
      />
    </>
  );
}
