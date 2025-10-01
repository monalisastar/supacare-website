"use client";

import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

interface HeaderProps {
  breadcrumb?: string;
  onMenuClick?: () => void;
}

export default function Header({ breadcrumb, onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  // Safely get user name
  const userName = session?.user?.name || "Guest";

  return (
    <header className="w-full bg-white/15 backdrop-blur-xl border-b border-white/20 shadow-lg p-4 flex items-center justify-between">
      {/* Left: Logo + Title + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
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
          {breadcrumb && (
            <p className="text-sm text-gray-300 mt-1">{breadcrumb}</p>
          )}
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button
          className="relative text-gray-100 hover:text-white"
          aria-label="Notifications"
        >
          <FaBell className="text-2xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 text-gray-100 hover:text-white"
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:block font-medium">{userName}</span>
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white/30 backdrop-blur-md rounded shadow-lg text-gray-800 py-2 z-50">
              <a
                href="/dashboard/profile"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Profile
              </a>
              <a
                href="/dashboard/settings"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Settings
              </a>
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
    </header>
  );
}
