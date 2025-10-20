"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FaUsers, FaRecycle, FaChartLine, FaFileAlt, FaBlog } from "react-icons/fa";

// Dynamic imports (lazy-loaded)
const Users = dynamic(() => import("./Users"));
const ServicesManagement = dynamic(() => import("./ServicesManagement"));
const Analytics = dynamic(() => import("./Analytics"));
const CMSPanel = dynamic(() => import("./CMSPanel"));
const BlogManagement = dynamic(() => import("./BlogManagement"));

export default function AdminDashboard() {
  const [collapsedPanels, setCollapsedPanels] = useState<{ [key: string]: boolean }>({
    users: true,
    services: true,
    analytics: true,
    cms: true,
    blog: true,
  });

  const togglePanel = (panel: string) => {
    setCollapsedPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };

  const panels = [
    { key: "users", title: "User Management", icon: <FaUsers />, Component: Users },
    { key: "services", title: "Services Management", icon: <FaRecycle />, Component: ServicesManagement },
    { key: "analytics", title: "Analytics", icon: <FaChartLine />, Component: Analytics },
    { key: "cms", title: "CMS Management", icon: <FaFileAlt />, Component: CMSPanel },
    { key: "blog", title: "Blog Management", icon: <FaBlog />, Component: BlogManagement },
  ];

  return (
    <div className="flex flex-col gap-6">
      {panels.map(panel => (
        <div key={panel.key} className="bg-gray-900 p-4 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {panel.icon} {panel.title}
            </h2>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => togglePanel(panel.key)}
            >
              {collapsedPanels[panel.key] ? "Expand" : "Collapse"}
            </button>
          </div>

          {/* Only render component when expanded */}
          {!collapsedPanels[panel.key] && <panel.Component />}
        </div>
      ))}
    </div>
  );
}
