"use client";

import React, { useState, useEffect } from "react";
import { FaSave, FaUpload, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Blog {
  id?: string;
  title: string;
  content: string;
  category: string;
  media: File[];
}

interface BlogEditorProps {
  blog: Blog | null; // null if creating new
  onClose: () => void;
  onSave?: () => void;
}

const glassmorphism =
  "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl";

export default function BlogEditor({ blog, onClose, onSave }: BlogEditorProps) {
  const [currentBlog, setCurrentBlog] = useState<Blog>({
    id: blog?.id,
    title: blog?.title || "",
    content: blog?.content || "",
    category: blog?.category || "",
    media: [],
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (field: keyof Blog, value: any) => {
    setCurrentBlog((prev) => ({ ...prev, [field]: value }));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setCurrentBlog((prev) => ({ ...prev, media: [...prev.media, ...files] }));
  };

  const handleRemoveMedia = (index: number) => {
    setCurrentBlog((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", currentBlog.title);
      formData.append("content", currentBlog.content);
      formData.append("category", currentBlog.category);
      formData.append("published", JSON.stringify(publish));
      currentBlog.media.forEach((file) => formData.append("media", file));

      const url = currentBlog.id ? `/api/blogs/${currentBlog.id}` : `/api/blogs`;
      const method = currentBlog.id ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });

      if (res.ok) {
        onSave?.();
        router.refresh();
        alert(`Blog ${publish ? "published" : "saved"} successfully!`);
        onClose();
      } else {
        alert("Error saving blog.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving blog.");
    }
    setLoading(false);
  };

  return (
    <div className={`p-6 ${glassmorphism} flex flex-col gap-4`}>
      <h2 className="text-xl font-bold">{currentBlog.id ? "Edit Blog" : "Create New Blog"}</h2>

      <input
        type="text"
        placeholder="Blog Title"
        value={currentBlog.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="p-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60"
      />

      <textarea
        placeholder="Blog Content (Markdown supported)"
        value={currentBlog.content}
        onChange={(e) => handleChange("content", e.target.value)}
        className="p-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 min-h-[200px] resize-none"
      />

      <input
        type="text"
        placeholder="Category"
        value={currentBlog.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="p-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60"
      />

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <FaUpload />
          <span>Upload Media</span>
          <input type="file" multiple onChange={handleMediaUpload} className="hidden" />
        </label>

        <div className="flex gap-2 flex-wrap">
          {currentBlog.media.map((file, idx) => (
            <div
              key={idx}
              className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/30"
            >
              {file.type.startsWith("image") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => handleRemoveMedia(idx)}
                className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleSave(false)}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          disabled={loading}
        >
          <FaSave /> Save Draft
        </button>

        <button
          onClick={() => handleSave(true)}
          className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2"
          disabled={loading}
        >
          <FaSave /> Publish
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center gap-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
