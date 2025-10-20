"use client";

import React, { useState } from "react";
import PageList from "./cms/PageList";
import PageEditor from "./cms/PageEditor";
import PagePreview from "./cms/PagePreview";
import MediaLibrary from "./cms/MediaLibrary";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CMSPanel() {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-full w-full text-white">
      {/* Sidebar: Page List */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-72"
        } bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-4">
          {!sidebarCollapsed && <h2 className="text-xl font-semibold">Pages</h2>}
          <button
            className="p-2 text-white bg-lime-500 rounded-full hover:bg-lime-400"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <PageList
          onSelectPage={(id: string) => setSelectedPageId(id)}
          selectedPageId={selectedPageId}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* Main Editor & Preview */}
      <div className="flex-1 flex flex-col gap-4 p-4">
        <div className="flex flex-1 gap-4">
          {/* Editor */}
          <div className="flex-1 glassmorphism p-4 overflow-auto">
            {selectedPageId ? (
              <PageEditor pageId={selectedPageId} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select a page to edit
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="flex-1 glassmorphism p-4 overflow-auto">
            {selectedPageId ? (
              <PagePreview pageId={selectedPageId} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Page preview will appear here
              </div>
            )}
          </div>
        </div>

        {/* Media Library */}
        <div className="glassmorphism p-4">
          <h3 className="text-lg font-semibold mb-2">Media Library</h3>
          <MediaLibrary />
        </div>
      </div>
    </div>
  );
}

/* Glassmorphism utility (can also be placed in a shared CSS file) */
export const glassmorphism =
  "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl";
