"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "./blog/BlogCard";
import BlogEditor from "./blog/BlogEditor";
import CategoryManager from "./blog/CategoryManager";
import { FaPlus, FaSearch, FaFolder } from "react-icons/fa";

interface Blog {
  id: string;
  title: string;
  author: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  category: string;
}

const glassmorphism =
  "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  // Mock fetch blogs
  useEffect(() => {
    // Replace with API call
    setBlogs([
      {
        id: "1",
        title: "Sustainable Composting 101",
        author: "Admin",
        status: "published",
        createdAt: "2025-10-01",
        updatedAt: "2025-10-02",
        category: "Composting",
      },
      {
        id: "2",
        title: "Waste Management Best Practices",
        author: "Admin",
        status: "draft",
        createdAt: "2025-09-28",
        updatedAt: "2025-09-29",
        category: "Waste Management",
      },
    ]);
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header: Search + Actions */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${glassmorphism} p-4`}
      >
        <div className="flex items-center gap-2 bg-white/20 rounded-lg p-2">
          <FaSearch className="text-white" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none placeholder-white text-white w-full"
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-2 px-4 py-2 ${glassmorphism} hover:bg-white/20 transition`}
            onClick={handleCreate}
          >
            <FaPlus /> Create New Blog
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 ${glassmorphism} hover:bg-white/20 transition`}
            onClick={() => setShowCategories(!showCategories)}
          >
            <FaFolder /> Categories
          </button>
        </div>
      </div>

      {/* Category Manager */}
      {showCategories && (
        <div className={`${glassmorphism} p-4`}>
          <CategoryManager />
        </div>
      )}

      {/* Blog Editor */}
      {showEditor && (
        <div className={`${glassmorphism} p-4`}>
          <BlogEditor blog={editingBlog} onClose={() => setShowEditor(false)} />
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} onEdit={() => handleEdit(blog)} />
        ))}
      </div>
    </div>
  );
}
