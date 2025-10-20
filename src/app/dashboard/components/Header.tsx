"use client";

import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaBell, FaUserCircle, FaCommentDots, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AdvancedChatPanel from "./AdvancedChatPanel"; // ✅ Reuse this
import type { HeaderProps } from "./types"; // optional if you separated types

export default function Header({ breadcrumb, onMenuClick, onSwitchRole }: HeaderProps) {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);

  const userName = session?.user?.name || "Guest";
  const userRole = session?.user?.role as "ADMIN" | "CLIENT" | undefined;
  const userId = session?.user?.email ?? "guest";

  const unreadNotifications = 3;
  const unreadMessages = 0; // You can replace this with real unread logic from your backend

  return (
    <header className="w-full bg-white/15 backdrop-blur-xl border-b border-white/20 shadow-lg p-4 flex items-center justify-between relative">
      {/* Left: Logo + Title + Breadcrumb */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            className="lg:hidden text-gray-100 hover:text-white mr-2"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <FaBars className="text-2xl" />
          </button>
        )}
        <Image
          src="/images/supalogo.png"
          alt="Supacare Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Supacare Dashboard</h1>
          {breadcrumb && <p className="text-sm text-gray-300 mt-1">{breadcrumb}</p>}
        </div>
      </div>

      {/* Right: Notifications, Chat & Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button
          className="relative text-gray-100 hover:text-white"
          aria-label="Notifications"
        >
          <FaBell className="text-2xl" />
          {unreadNotifications > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Chat Button */}
        <button
          className="relative text-gray-100 hover:text-white"
          aria-label="Messages"
          onClick={() => {
            setChatOpen(true);
            setChatMinimized(false);
          }}
        >
          <FaCommentDots className="text-2xl" />
          {unreadMessages > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(prev => !prev)}
            className="flex items-center gap-2 text-gray-100 hover:text-white"
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:block font-medium">{userName}</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white/30 backdrop-blur-md rounded shadow-lg text-gray-800 py-2 z-50">
              <a href="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </a>
              <a href="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-200">
                Settings
              </a>

              {userRole === "ADMIN" && onSwitchRole && (
                <>
                  <hr className="my-1 border-gray-300" />
                  <button
                    onClick={() => onSwitchRole("CLIENT")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Switch to Client View
                  </button>
                </>
              )}

              <hr className="my-1 border-gray-300" />
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🟢 Floating Chat Window (Reused from Sidebar) */}
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
            <FaCommentDots size={24} />
          </motion.div>
        )}
      </AnimatePresence>

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
                <button
                  onClick={() => {
                    setChatOpen(false);
                    setChatMinimized(true);
                  }}
                  title="Minimize"
                >
                  <FaChevronDown />
                </button>
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
    </header>
  );
}
