import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogMetadata = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getAllBlogs(): BlogMetadata[] {
  const files = fs.readdirSync(BLOG_DIR);

  const blogs = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents);

      return {
        title: data.title,
        slug: data.slug,
        publishedAt: data.publishedAt,
        excerpt: data.excerpt,
        tags: data.tags,
        coverImage: data.coverImage,
      } as BlogMetadata;
    });

  // Sort by newest
  return blogs.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
