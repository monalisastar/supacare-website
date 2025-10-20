"use client";

import { useState, useEffect } from "react";
import { FaUpload, FaTrashAlt, FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video" | "pdf";
  url: string;
}

export default function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch media assets (mock API call)
  useEffect(() => {
    // Replace with real API fetch
    setMediaItems([
      { id: "1", name: "banner.jpg", type: "image", url: "/media/banner.jpg" },
      { id: "2", name: "intro.mp4", type: "video", url: "/media/intro.mp4" },
      { id: "3", name: "brochure.pdf", type: "pdf", url: "/media/brochure.pdf" },
    ]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    // Mock upload logic
    const newMedia: MediaItem = {
      id: Date.now().toString(),
      name: selectedFile.name,
      type: selectedFile.type.includes("image")
        ? "image"
        : selectedFile.type.includes("video")
        ? "video"
        : "pdf",
      url: URL.createObjectURL(selectedFile),
    };

    setMediaItems((prev) => [newMedia, ...prev]);
    setSelectedFile(null);
    setUploading(false);
  };

  const handleDelete = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Media Library</h2>

      {/* Upload Section */}
      <div className="flex gap-4 items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="text-white file:rounded-lg file:border file:border-white/30 file:bg-white/10 file:text-white file:py-2 file:px-4"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className="flex items-center gap-2 px-4 py-2 bg-lime-500 rounded-lg hover:bg-lime-400 transition"
        >
          {uploading ? "Uploading..." : "Upload"} <FaUpload />
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {mediaItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 flex flex-col gap-2"
            >
              <div className="flex-1 flex items-center justify-center">
                {item.type === "image" && (
                  <img src={item.url} alt={item.name} className="object-contain h-32 w-full rounded-lg" />
                )}
                {item.type === "video" && (
                  <video src={item.url} className="h-32 w-full rounded-lg" controls />
                )}
                {item.type === "pdf" && (
                  <div className="flex items-center justify-center h-32 w-full bg-gray-800 rounded-lg text-white font-bold">
                    PDF
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="truncate">{item.name}</span>
                <div className="flex gap-2">
                  <button className="hover:text-lime-400">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="hover:text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
