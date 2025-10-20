"use client";

import { useState } from "react";
import { FaEdit, FaTrashAlt, FaArrowsAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface SectionCardProps {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string;
  onUpdate: (id: string, data: { title: string; content: string; mediaUrl?: string }) => void;
  onDelete: (id: string) => void;
}

export default function SectionCard({ id, title, content, mediaUrl, onUpdate, onDelete }: SectionCardProps) {
  const [editing, setEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localContent, setLocalContent] = useState(content);
  const [localMedia, setLocalMedia] = useState<File | null>(null);

  const handleSave = () => {
    const mediaUrlStr = localMedia ? URL.createObjectURL(localMedia) : mediaUrl;
    onUpdate(id, { title: localTitle, content: localContent, mediaUrl: mediaUrlStr });
    setEditing(false);
    setLocalMedia(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLocalMedia(e.target.files[0]);
    }
  };

  return (
    <motion.div
      layout
      className="p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg flex flex-col gap-3"
    >
      {editing ? (
        <>
          <input
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white"
          />
          <textarea
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white resize-none"
            rows={4}
          />
          <input type="file" onChange={handleFileChange} className="text-white file:bg-white/10 file:text-white file:px-3 file:py-1 file:rounded-md" />

          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-lime-500 hover:bg-lime-400 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex gap-2">
              <button onClick={() => setEditing(true)} className="hover:text-lime-400">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(id)} className="hover:text-red-500">
                <FaTrashAlt />
              </button>
              <button className="hover:text-gray-300 cursor-move">
                <FaArrowsAlt />
              </button>
            </div>
          </div>

          <p className="text-white/80">{content}</p>

          {mediaUrl && (
            <div className="mt-2">
              {mediaUrl.endsWith(".mp4") ? (
                <video src={mediaUrl} controls className="w-full rounded-lg" />
              ) : mediaUrl.endsWith(".pdf") ? (
                <div className="bg-gray-800 rounded-lg p-4 text-white font-bold">PDF: {mediaUrl.split("/").pop()}</div>
              ) : (
                <img src={mediaUrl} alt={title} className="w-full rounded-lg object-contain" />
              )}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
