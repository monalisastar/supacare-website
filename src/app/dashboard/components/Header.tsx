"use client";

import { signOut, useSession } from "next-auth/react";
import { FaBell } from "react-icons/fa";

interface HeaderProps {
  breadcrumb?: string;
}

export default function Header({ breadcrumb }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="backdrop-blur-md bg-white/30 shadow-md p-4 flex justify-between items-center rounded-b-xl mx-4 mt-4">
      <div className="flex flex-col md:flex-row md:items-center md:gap-6">
        {/* Breadcrumb / Page title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{breadcrumb || "Dashboard"}</h1>
          <p className="text-sm text-gray-800 mt-1">
            Welcome, {session?.user?.name || session?.user?.email}
          </p>
        </div>

        {/* Notification bell */}
        <div className="hidden md:flex items-center gap-3 mt-2 md:mt-0 text-gray-700">
          <FaBell size={20} className="hover:text-green-600 cursor-pointer transition" />
          {/* Future notifications dropdown can be added here */}
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Logout
      </button>
    </header>
  );
}
