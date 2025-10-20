"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useSession } from "next-auth/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionRole = session?.user?.role || "CLIENT";

  const [role, setRole] = useState<"ADMIN" | "CLIENT">(
    (searchParams.get("view") as "ADMIN" | "CLIENT") || sessionRole
  );

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "ADMIN" || viewParam === "CLIENT") {
      setRole(viewParam);
    }
  }, [searchParams]);

  const breadcrumb =
    pathname
      .split("/")
      .filter(Boolean)
      .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
      .join(" / ") || "Overview";

  useEffect(() => {
    if (sidebarOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [sidebarOpen]);

  const handleSwitchRole = (newRole: "ADMIN" | "CLIENT") => {
    setRole(newRole);
    router.push(`${pathname}?view=${newRole}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} role={role} />
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
        {/* Drawer */}
        <div
          className={`relative w-64 glassmorphism transform transition-transform duration-300 pointer-events-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar collapsed={false} setCollapsed={setCollapsed} role={role} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-50">
          <Header
            breadcrumb={breadcrumb}
            onMenuClick={() => setSidebarOpen(true)}
            role={role}
            onSwitchRole={handleSwitchRole}
          />
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading dashboard...</div>}>
      <LayoutContent {...props} />
    </Suspense>
  );
}
