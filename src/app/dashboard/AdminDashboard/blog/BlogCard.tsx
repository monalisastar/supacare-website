"use client";

import React from "react";
import { FaEdit, FaTrash, FaCircle } from "react-icons/fa";

interface Blog {
  id: string;
  title: string;
  author: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  category: string;
}

interface BlogCardProps {
  blog: Blog;
  onEdit: () => void;
  onDelete?: () => void;
}

const glassmorphism =
  "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl";

export default function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  return (
    <div className={`${glassmorphism} p-6 flex flex-col justify-between h-full`}>
      {/* Header: Title + Status */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{blog.title}</h3>
        <span className="flex items-center gap-1 text-sm">
          <FaCircle
            className={`${
              blog.status === "published" ? "text-green-400" : "text-yellow-400"
            }`}
          />
          {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
        </span>
      </div>

      {/* Body: Author + Category */}
      <div className="mb-4 text-sm text-white/80">
        <p>
          <strong>Author:</strong> {blog.author}
        </p>
        <p>
          <strong>Category:</strong> {blog.category}
        </p>
        <p>
          <strong>Created:</strong> {blog.createdAt}
        </p>
        <p>
          <strong>Updated:</strong> {blog.updatedAt}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-auto">
        <button
          className="flex items-center gap-1 px-3 py-1 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition"
          onClick={onEdit}
        >
          <FaEdit /> Edit
        </button>
        {onDelete && (
          <button
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600/30 hover:bg-red-600/50 rounded-lg transition"
            onClick={onDelete}
          >
            <FaTrash /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
