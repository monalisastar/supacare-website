import { getAllBlogs } from '../../lib/blog';


import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50 px-4 py-10">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-2">
          SupaCare Insights
        </h1>
        <p className="text-green-700 text-lg">
          Stories, strategies, and solutions for sustainable living
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
        {/* Left: Blog Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>

        {/* Right: Sidebar */}
        <Sidebar blogs={blogs} />
      </section>
    </main>
  );
}
