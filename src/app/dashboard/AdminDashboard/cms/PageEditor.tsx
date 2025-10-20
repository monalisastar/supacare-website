"use client";

import { useState } from "react";
import { FaPlus, FaTrash, FaArrowsAlt } from "react-icons/fa";
import { motion, AnimatePresence, Reorder } from "framer-motion";

export interface Section {
  id: string;
  type: "text" | "image" | "video" | "pdf";
  content: string;
}

export interface PageEditorProps {
  pageId: string;
  initialSections: Section[];
  onSave: (pageId: string, sections: Section[]) => void;
}

export default function PageEditor({ pageId, initialSections, onSave }: PageEditorProps) {
  const [sections, setSections] = useState<Section[]>(initialSections || []);

  const addSection = (type: Section["type"]) => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      type,
      content: "",
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, content: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section Add Buttons */}
      <div className="flex gap-3 flex-wrap">
        {(["text", "image", "video", "pdf"] as Section["type"][]).map((type) => (
          <button
            key={type}
            onClick={() => addSection(type)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
              type === "text"
                ? "bg-blue-500/20 hover:bg-blue-500/40"
                : type === "image"
                ? "bg-green-500/20 hover:bg-green-500/40"
                : type === "video"
                ? "bg-purple-500/20 hover:bg-purple-500/40"
                : "bg-yellow-500/20 hover:bg-yellow-500/40"
            }`}
          >
            <FaPlus /> {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Section List with Reorder */}
      <Reorder.Group axis="y" values={sections} onReorder={setSections} className="flex flex-col gap-4">
        <AnimatePresence>
          {sections.map((section) => (
            <Reorder.Item
              key={section.id}
              value={section}
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg flex flex-col gap-3"
            >
              {/* Section Header */}
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2">
                  <FaArrowsAlt className="cursor-grab" /> {section.type.toUpperCase()}
                </span>
                <button onClick={() => deleteSection(section.id)} className="text-red-400 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>

              {/* Section Content */}
              {section.type === "text" ? (
                <textarea
                  className="w-full p-3 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/50"
                  placeholder="Enter text content..."
                  value={section.content}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Enter ${section.type.toUpperCase()} URL`}
                  className="w-full p-3 bg-white/10 rounded-lg border border-white/20 text-white placeholder-white/50"
                  value={section.content}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                />
              )}
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onSave(pageId, sections)}
          className="px-6 py-3 bg-blue-500/30 hover:bg-blue-500/50 rounded-xl font-semibold transition"
        >
          Save Page
        </button>
      </div>
    </div>
  );
}
