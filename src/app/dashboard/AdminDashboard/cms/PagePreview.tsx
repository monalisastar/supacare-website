"use client";

import { motion } from "framer-motion";

interface Section {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string;
}

interface PagePreviewProps {
  sections: Section[];
}

export default function PagePreview({ sections }: PagePreviewProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="p-6 text-white/70 text-center">No sections available. Add a section to preview it.</div>
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
          <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
          <p className="text-white/80 mb-4">{section.content}</p>

          {section.mediaUrl && (
            <div className="mt-2">
              {section.mediaUrl.endsWith(".mp4") ? (
                <video src={section.mediaUrl} controls className="w-full rounded-lg" />
              ) : section.mediaUrl.endsWith(".pdf") ? (
                <div className="bg-gray-800 rounded-lg p-4 font-bold">
                  PDF Preview: {section.mediaUrl.split("/").pop()}
                </div>
              ) : (
                <img src={section.mediaUrl} alt={section.title} className="w-full rounded-lg object-contain" />
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
