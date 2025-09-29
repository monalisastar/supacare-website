"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Generate breadcrumb/title from path
  const breadcrumb = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join(" / ") || "Overview";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with collapse state */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Glassmorphic Header */}
        <Header breadcrumb={breadcrumb} />

        {/* Page content */}
        <main className="p-6 flex-1 text-gray-800">{children}</main>
      </div>
    </div>
  );
}
