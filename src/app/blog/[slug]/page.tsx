import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// ✅ Import all custom MDX components
import BlogImage from '@/components/BlogImage';
import BlogQuote from '@/components/BlogQuote';
import CallToAction from '@/components/CallToAction';

// ✅ Register components
const mdxComponents = {
  BlogImage,
  BlogQuote,
  CallToAction,
};

export async function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) return {};

  const file = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(file);

  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: [data.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const file = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(file);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-green-900">
      <h1 className="text-4xl font-bold text-green-800 mb-2">{data.title}</h1>
      <p className="text-green-600 mb-6 text-sm">{data.publishedAt}</p>
      <div className="prose prose-green max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </main>
  );
}
