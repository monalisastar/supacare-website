"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaProjectDiagram,
  FaTrashAlt,
  FaChartLine,
  FaRecycle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Sidebar structure
const links = [
  {
    href: "/dashboard/consultancy",
    label: "Consultancy",
    icon: <FaProjectDiagram />,
    submenu: [
      { href: "/dashboard/consultancy/overview", label: "Overview" },
      { href: "/dashboard/consultancy/active", label: "Active Projects" },
      { href: "/dashboard/consultancy/completed", label: "Completed Projects" },
      { href: "/dashboard/consultancy/new", label: "New Project" },
    ],
  },
  {
    href: "/dashboard/composting",
    label: "Composting Services",
    icon: <FaRecycle />,
    submenu: [
      { href: "/dashboard/composting/overview", label: "Overview" },
      { href: "/dashboard/composting/machines", label: "Onsite Machines" },
      { href: "/dashboard/composting/sales", label: "Compost Sales" },
      { href: "/dashboard/composting/training", label: "Training & Setup" },
      { href: "/dashboard/composting/process", label: "Composting Process" },
    ],
  },
  {
    href: "/dashboard/agriculture",
    label: "Compost for Agriculture",
    icon: <FaChartLine />,
    submenu: [
      { href: "/dashboard/agriculture/overview", label: "Overview" },
      { href: "/dashboard/agriculture/farms", label: "Bulk Supply to Farms" },
      // "Soil Health Benefits" and "Order & Delivery" removed
    ],
  },
  {
    href: "/dashboard/waste-collection",
    label: "Waste Collection",
    icon: <FaTrashAlt />,
    submenu: [
      { href: "/dashboard/waste-collection/overview", label: "Overview" },
      { href: "/dashboard/waste-collection/routes", label: "Routes" },
      { href: "/dashboard/waste-collection/bins", label: "Bins" },
      { href: "/dashboard/waste-collection/schedule", label: "Schedule" },
    ],
  },
  {
    href: "/dashboard/smart-waste",
    label: "Smart Waste",
    icon: <FaChartLine />,
    submenu: [
      { href: "/dashboard/smart-waste/overview", label: "Overview" },
      { href: "/dashboard/smart-waste/audit", label: "Request Smart Audit" },
      { href: "/dashboard/smart-waste/alerts", label: "Alerts" },
      { href: "/dashboard/smart-waste/analytics", label: "Insights & Reports" },
    ],
  },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isSubmenuOpen = (label: string) => openSubmenus.includes(label);

  const submenuClass = (isActive: boolean) =>
    `flex items-center gap-2 p-2 rounded-lg hover:bg-lime-400 transition ${
      isActive ? "bg-lime-400 font-semibold" : ""
    }`;

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-lime-500 text-white p-4">
        <h2 className="text-xl font-bold">Supacare</h2>
        <button onClick={toggleMobile}>
          {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-lime-500 text-white h-screen p-6 flex flex-col fixed md:static z-50 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "left-0" : "-left-full"} md:left-0`}
      >
        {/* Collapse button (desktop) */}
        <button
          className="hidden md:block mb-6 self-end text-white"
          onClick={() => {
            setCollapsed(!collapsed);
            if (!collapsed) setOpenSubmenus([]); // close submenus on collapse
          }}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>

        <h2 className={`text-2xl font-bold mb-10 ${collapsed ? "hidden" : "block"}`}>
          Supacare
        </h2>

        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const hasSubmenu = !!link.submenu;
            const submenuOpen = isSubmenuOpen(link.label);

            return (
              <div key={link.href} className="flex flex-col">
                <button
                  onClick={() => hasSubmenu && toggleSubmenu(link.label)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-lime-400 transition
                    ${isActive ? "bg-lime-400 font-semibold" : ""}`}
                  aria-expanded={submenuOpen}
                  tabIndex={0}
                >
                  <span className="text-lg">{link.icon}</span>
                  {!collapsed && <span className="flex-1 text-left">{link.label}</span>}
                  {!collapsed && hasSubmenu && (
                    <span>{submenuOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                  )}
                </button>

                {/* Animated Submenu */}
                <AnimatePresence>
                  {hasSubmenu && submenuOpen && !collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-8 flex flex-col gap-1 mt-1 overflow-hidden"
                    >
                      {link.submenu!.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={submenuClass(pathname === sub.href)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}
    </>
  );
}
