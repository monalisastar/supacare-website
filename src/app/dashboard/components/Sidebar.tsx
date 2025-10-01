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
} from "react-icons/fa";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

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
    href: "/dashboard/chat",
    label: "Chat",
    icon: <FaComments />,
    submenu: [
      { href: "/dashboard/chat/inbox", label: "Inbox" },
      { href: "/dashboard/chat/new", label: "New Message" },
    ],
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
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

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
    <aside
      className={`bg-lime-500 text-white h-full md:h-screen p-6 flex flex-col z-50 transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Collapse button (desktop only) */}
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

      {/* Logo / Title */}
      <h2 className={`text-2xl font-bold mb-10 ${collapsed ? "hidden" : "block"}`}>
        Supacare
      </h2>

      {/* Nav links */}
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
  );
}
