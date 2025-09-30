"use client";

import { signOut, useSession } from "next-auth/react";
import { FaBell, FaBars } from "react-icons/fa";

interface HeaderProps {
  breadcrumb?: string;
  onMenuClick?: () => void; // 👈 added
}

export default function Header({ breadcrumb, onMenuClick }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="backdrop-blur-md bg-white/30 shadow-md p-4 flex justify-between items-center rounded-b-xl mx-4 mt-4">
      <div className="flex items-center gap-4">
        {/* 👇 Hamburger menu for mobile only */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <FaBars size={20} className="text-gray-700" />
          </button>
        )}

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">
            {breadcrumb || "Dashboard"}
          </h1>
          <p className="text-sm text-gray-800 mt-1">
            Welcome, {session?.user?.name || session?.user?.email}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification bell (hidden on mobile) */}
        <div className="hidden md:flex items-center text-gray-700">
          <FaBell
            size={20}
            className="hover:text-green-600 cursor-pointer transition"
          />
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
