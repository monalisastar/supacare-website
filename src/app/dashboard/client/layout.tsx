'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Bell, Sun, Moon, User, LogOut, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { handleLogout } from '@/utils/logout'  // ✅ reusable logout handler

// 🌿 Navigation structure
const navLinks = [
  { name: 'Overview', href: '/dashboard/client' },
  {
    name: 'Consultancy',
    subLinks: [
      {
        name: 'Environmental Consultancy',
        href: '/dashboard/client/consultancy/environmental',
      },
      {
        name: 'Carbon Consultancy',
        href: '/dashboard/client/consultancy/carbon',
      },
    ],
  },
  { name: 'Waste Management', href: '/dashboard/client/waste' },
  { name: 'Analytics', href: '/dashboard/client/analytics' },
  { name: 'Billing', href: '/dashboard/client/billing' },
  { name: 'Settings', href: '/dashboard/client/settings' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // ✅ Responsive sidebar
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-green-50 to-emerald-100 text-gray-800 overflow-hidden">
      {/* 🌿 Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -260 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="z-40 flex flex-col w-64 h-screen md:h-auto backdrop-blur-xl bg-white/70 border-r border-green-100 shadow-lg md:static fixed top-0 left-0"
      >
        {/* Logo section */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-green-100">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/supalogo.png"
              alt="Supacare"
              width={34}
              height={34}
              className="object-contain"
            />
            <span className="text-xl font-semibold text-green-700">
              Supacare
            </span>
          </Link>

          {/* Mobile close */}
          <button
            className="md:hidden text-gray-600 hover:text-green-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Sidebar navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const isParentActive = link.subLinks?.some((s) =>
              pathname.startsWith(s.href)
            )
            const [open, setOpen] = useState(isParentActive)

            return (
              <div key={link.name}>
                {/* Simple link */}
                {!link.subLinks ? (
                  <Link
                    href={link.href}
                    className={`block px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  // Dropdown section
                  <div>
                    <button
                      onClick={() => setOpen(!open)}
                      className={`w-full flex justify-between items-center px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        isParentActive
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-green-100 hover:text-green-700'
                      }`}
                    >
                      <span>{link.name}</span>
                      <motion.span
                        animate={{ rotate: open ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm"
                      >
                        ▶
                      </motion.span>
                    </button>

                    {/* Sub-links */}
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {link.subLinks.map((sub) => {
                            const activeSub = pathname === sub.href
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={`block px-3 py-2 text-sm rounded-lg transition-all ${
                                  activeSub
                                    ? 'bg-green-100 text-green-800 font-semibold'
                                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* 🔐 Logout button */}
        <div className="p-4 border-t border-green-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* 🌍 Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 backdrop-blur-md bg-white/60 border-b border-green-100 shadow-sm sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            {/* Mobile sidebar toggle */}
            <button
              className="md:hidden text-gray-600 hover:text-green-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-green-700">
              Sustainability Dashboard
            </h1>
          </div>

          {/* Right header controls */}
          <div className="flex items-center space-x-4 relative">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-green-100 text-gray-700"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-green-100 text-gray-700">
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-green-600 rounded-full"></span>
            </button>

            {/* Account menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1.5 rounded-full hover:bg-green-700 transition"
              >
                <User size={16} />
                <span className="text-sm font-medium">My Account</span>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-green-100 rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <Link
                      href="/dashboard/client/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings size={16} className="text-green-600" />
                      Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 bg-white/70 backdrop-blur-sm overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-green-100 bg-white/60 backdrop-blur-md text-sm text-gray-600 flex justify-between items-center">
          <p>© {new Date().getFullYear()} Supacare Solutions</p>
          <p className="text-green-700 font-medium">
            CO₂ Reduced: <span className="font-bold">12.3 tons</span> | Compost:{' '}
            <span className="font-bold">145 kg</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
