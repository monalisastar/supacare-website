"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Page {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
  status: "draft" | "published";
}

interface PageListProps {
  pages: Page[];
  onEdit: (pageId: string) => void;
  onDelete: (pageId: string) => void;
  onPreview: (pageId: string) => void;
}

export default function PageList({ pages, onEdit, onDelete, onPreview }: PageListProps) {
  const [pageItems, setPageItems] = useState<Page[]>([]);

  useEffect(() => {
    setPageItems(pages);
  }, [pages]);

  if (!pageItems || pageItems.length === 0) {
    return (
      <div className="p-6 text-white/70 text-center">
        No pages found. Create a new page to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {pageItems.map((page) => (
          <motion.div
            key={page.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-1">{page.title}</h2>
              <p className="text-white/70 mb-2">Slug: {page.slug}</p>
              <p className="text-white/50 text-sm">Last updated: {new Date(page.updatedAt).toLocaleString()}</p>
              <p className={`text-sm font-semibold mt-1 ${page.status === "published" ? "text-green-400" : "text-yellow-400"}`}>
                {page.status.toUpperCase()}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onEdit(page.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => onPreview(page.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/40 rounded-lg transition"
              >
                <FaEye /> Preview
              </button>
              <button
                onClick={() => onDelete(page.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
