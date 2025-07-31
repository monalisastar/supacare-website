'use client';

import Link from 'next/link';
import React from 'react';

type Blog = {
  title: string;
  slug: string;
  publishedAt: string;
  tags: string[];
};

type SidebarProps = {
  blogs: Blog[];
};

export default function Sidebar({ blogs }: SidebarProps) {
  const recentPosts = blogs.slice(0, 5);

  const tagsSet = new Set<string>();
  blogs.forEach((blog) => blog.tags.forEach((tag) => tagsSet.add(tag)));
  const categories = Array.from(tagsSet);

  const archivesMap: { [key: string]: Blog[] } = {};
  blogs.forEach((blog) => {
    const key = blog.publishedAt.slice(0, 7);
    if (!archivesMap[key]) archivesMap[key] = [];
    archivesMap[key].push(blog);
  });

  const archives = Object.entries(archivesMap).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <aside className="space-y-8 w-full md:w-80 p-4 bg-white/30 backdrop-blur-md rounded-xl border border-white/20 text-gray-900 shadow-md">
      {/* Recent Posts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🆕 Recent Posts</h3>
        <ul className="space-y-1">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-gray-700 hover:text-green-700 font-medium"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🗂 Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full border border-green-300"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Archives */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">📅 Archive</h3>
        <ul className="text-sm space-y-1">
          {archives.map(([month, posts]) => (
            <li key={month} className="text-gray-700">
              {month} ({posts.length})
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
