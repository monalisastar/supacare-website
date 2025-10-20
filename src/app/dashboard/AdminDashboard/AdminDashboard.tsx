"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaUsers, FaRecycle, FaChartLine, FaFileAlt, FaBlog } from "react-icons/fa";

// Dynamic imports for panels with proper typing
const Users = dynamic(() => import("./Users")) as React.ComponentType;
const ServicesManagement = dynamic(() => import("./ServicesManagement")) as React.ComponentType;
const Analytics = dynamic(() => import("./Analytics")) as React.ComponentType;
const CMSPanel = dynamic(() => import("./CMSPanel")) as React.ComponentType;
const BlogManagement = dynamic(() => import("./BlogManagement")) as React.ComponentType;

interface Panel {
  key: string;
  title: string;
  icon: React.JSX.Element;
  Component: React.ComponentType;
}

export default function AdminDashboard() {
  const [collapsedPanels, setCollapsedPanels] = useState<Record<string, boolean>>({
    users: true,
    services: true,
    analytics: true,
    cms: true,
    blog: true,
  });

  const togglePanel = (key: string) => {
    setCollapsedPanels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const panels: Panel[] = [
    { key: "users", title: "User Management", icon: <FaUsers />, Component: Users },
    { key: "services", title: "Services Management", icon: <FaRecycle />, Component: ServicesManagement },
    { key: "analytics", title: "Analytics", icon: <FaChartLine />, Component: Analytics },
    { key: "cms", title: "CMS Management", icon: <FaFileAlt />, Component: CMSPanel },
    { key: "blog", title: "Blog Management", icon: <FaBlog />, Component: BlogManagement },
  ];

  return (
    <div className="flex flex-col gap-6">
      {panels.map(({ key, title, icon, Component }) => (
        <div key={key} className="bg-gray-900 p-4 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {icon} {title}
            </h2>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => togglePanel(key)}
            >
              {collapsedPanels[key] ? "Expand" : "Collapse"}
            </button>
          </div>

          {/* Render only if expanded */}
          {!collapsedPanels[key] && <Component />}
        </div>
      ))}
    </div>
  );
}
