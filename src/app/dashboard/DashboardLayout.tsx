"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Breadcrumb from pathname
  const breadcrumb =
    pathname
      .split("/")
      .filter(Boolean)
      .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
      .join(" / ") || "Overview";

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Sidebar (mobile drawer) */}
      <div className="fixed inset-0 z-40 flex md:hidden pointer-events-none">
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Sidebar panel */}
        <div
          className={`relative w-64 glassmorphism transform transition-transform duration-300 pointer-events-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar collapsed={false} setCollapsed={setCollapsed} />
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        } md:static`}
      >
        {/* Header with breadcrumb + menu button */}
        <Header breadcrumb={breadcrumb} onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div
            className="
              grid gap-6
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              2xl:grid-cols-4
              auto-rows-min
            "
          >
            {/* Force every child (card) to span full width */}
            {React.Children.map(children, (child) => (
              <div className="col-span-full">{child}</div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* Glassmorphism helper class */
const glassmorphism =
  "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl";
