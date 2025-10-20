"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaProjectDiagram,
  FaTrashAlt,
  FaRecycle,
  FaComments,
  FaCreditCard,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";
import AdvancedChatPanel from "./AdvancedChatPanel";
import { useSession } from "next-auth/react";

/* ---------------- Role-based Links ---------------- */
const ROLE_LINKS = {
  CLIENT: [
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
        { href: "/dashboard/composting/agriculture", label: "Bulk Supply to Farms" },
      ],
    },
    {
      href: "/dashboard/waste-management",
      label: "Waste Management",
      icon: <FaTrashAlt />,
      submenu: [
        { href: "/dashboard/waste-management/overview", label: "Overview" },
        { href: "/dashboard/waste-management/routes", label: "Routes" },
        { href: "/dashboard/waste-management/bins", label: "Bins" },
        { href: "/dashboard/waste-management/schedule", label: "Schedule" },
        { href: "/dashboard/waste-management/smart", label: "Smart Waste" },
      ],
    },
    {
      href: "#",
      label: "Chat",
      icon: <FaComments />,
      submenu: [],
    },
    {
      href: "/dashboard/payments",
      label: "Payments",
      icon: <FaCreditCard />,
      submenu: [
        { href: "/dashboard/payments/history", label: "Payment History" },
        { href: "/dashboard/payments/invoices", label: "Invoices" },
        { href: "/dashboard/payments/funding", label: "Funding Status" },
      ],
    },
  ],

  ADMIN: [
    {
      href: "/dashboard/admin/users",
      label: "User Management",
      icon: <FaProjectDiagram />,
      submenu: [
        { href: "/dashboard/admin/users/overview", label: "All Users" },
        { href: "/dashboard/admin/users/roles", label: "Roles & Permissions" },
      ],
    },
    {
      href: "/dashboard/admin/services",
      label: "Services Management",
      icon: <FaRecycle />,
      submenu: [
        { href: "/dashboard/admin/services/overview", label: "All Services" },
        { href: "/dashboard/admin/services/pending", label: "Pending Approvals" },
      ],
    },
    {
      href: "/dashboard/admin/analytics",
      label: "Analytics",
      icon: <FaChartLine />,
      submenu: [],
    },
    {
      href: "#",
      label: "Chat",
      icon: <FaComments />,
      submenu: [],
    },
    {
      href: "/dashboard/admin/payments",
      label: "Payments",
      icon: <FaCreditCard />,
      submenu: [],
    },
  ],
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  role?: "CLIENT" | "ADMIN";
}

export default function Sidebar({ collapsed, setCollapsed, role }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userId = session?.user?.email ?? "guest";

  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);

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

  const links = ROLE_LINKS[role ?? "CLIENT"] ?? [];

  const handleChatClick = () => {
    setChatOpen(true);
    setChatMinimized(false);
  };

  return (
    <>
      {/* 🟢 Sidebar */}
      <aside
        className={`bg-lime-500 text-white h-full md:h-screen p-6 flex flex-col z-50 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
      >
        <button
          className="hidden md:block mb-6 self-end text-white"
          onClick={() => {
            setCollapsed(!collapsed);
            if (!collapsed) setOpenSubmenus([]);
          }}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>

        <h2 className={`text-2xl font-bold mb-10 ${collapsed ? "hidden" : "block"}`}>
          Supacare
        </h2>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const hasSubmenu = !!link.submenu?.length;
            const submenuOpen = isSubmenuOpen(link.label);

            return (
              <div key={link.href} className="flex flex-col">
                <button
                  onClick={() => {
                    if (link.label === "Chat") {
                      handleChatClick();
                    } else if (hasSubmenu) {
                      toggleSubmenu(link.label);
                    }
                  }}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-lime-400 transition ${
                    isActive ? "bg-lime-400 font-semibold" : ""
                  }`}
                  aria-expanded={submenuOpen}
                  tabIndex={0}
                >
                  <span className="text-lg">{link.icon}</span>
                  {!collapsed && <span className="flex-1 text-left">{link.label}</span>}
                  {!collapsed && hasSubmenu && link.label !== "Chat" && (
                    <span>{submenuOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                  )}
                </button>

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

      {/* 🟡 Minimized Chat Bubble */}
      <AnimatePresence>
        {chatMinimized && !chatOpen && (
          <motion.div
            className="fixed bottom-8 right-8 w-14 h-14 bg-lime-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-[100]"
            onClick={() => setChatOpen(true)}
            drag
            dragMomentum={false}
            dragElastic={0.2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <FaComments size={24} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟢 Floating Draggable Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="fixed bottom-10 right-10 w-[380px] max-w-[90vw] bg-white rounded-2xl shadow-2xl z-[100] overflow-hidden flex flex-col cursor-grab active:cursor-grabbing"
            drag
            dragMomentum={false}
            dragElastic={0.15}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-lime-500 text-white cursor-grab">
              <h3 className="text-lg font-semibold">Chat Support</h3>
              <div className="flex gap-3">
                {/* Minimize Button */}
                <button
                  onClick={() => {
                    setChatOpen(false);
                    setChatMinimized(true);
                  }}
                  title="Minimize"
                >
                  <FaChevronDown />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setChatOpen(false);
                    setChatMinimized(false);
                  }}
                  title="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <AdvancedChatPanel userId={userId} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
