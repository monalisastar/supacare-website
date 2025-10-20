"use client";

import { motion } from "framer-motion";

export interface Section {
  id: string;
  type: "text" | "image" | "video" | "pdf";
  content: string; // text or media URL
}

interface PagePreviewProps {
  sections: Section[];
}

export default function PagePreview({ sections }: PagePreviewProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="p-6 text-white/70 text-center">
        No sections available. Add a section to preview it.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <motion.div
          key={section.id}
          layout
          className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-white"
        >
          {/* Section Header */}
          {section.type === "text" && section.content && (
            <p className="text-white/80">{section.content}</p>
          )}

          {section.type === "image" && section.content && (
            <img
              src={section.content}
              alt="Image Section"
              className="w-full rounded-lg object-contain"
            />
          )}

          {section.type === "video" && section.content && (
            <video
              src={section.content}
              controls
              className="w-full rounded-lg"
            />
          )}

          {section.type === "pdf" && section.content && (
            <div className="bg-gray-800 rounded-lg p-4 font-bold">
              PDF Preview: {section.content.split("/").pop()}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
