'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Bell, Sun, Moon, User, LogOut, FileText, Briefcase, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { handleLogout } from '@/utils/logout'

const navLinks = [
  { name: 'Overview', href: '/dashboard/consultant' },
  { name: 'Projects', href: '/dashboard/consultant/projects' },
  { name: 'Clients', href: '/dashboard/consultant/clients' },
  { name: 'Reports', href: '/dashboard/consultant/reports' },
  { name: 'Payments', href: '/dashboard/consultant/payments' },
  { name: 'Messages', href: '/dashboard/consultant/messages' },
  { name: 'Settings', href: '/dashboard/consultant/settings' },
]

export default function ConsultantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // Responsive sidebar toggle
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-blue-50 to-sky-100 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -260 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="z-40 flex flex-col w-64 h-screen md:h-auto backdrop-blur-xl bg-white/70 border-r border-blue-100 shadow-lg md:static fixed top-0 left-0"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-100">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/supalogo.webp"
              alt="Supacare"
              width={34}
              height={34}
              className="object-contain"
            />
            <span className="text-xl font-semibold text-blue-700">
              Supacare
            </span>
          </Link>

          <button
            className="md:hidden text-gray-600 hover:text-blue-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  active
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 backdrop-blur-md bg-white/60 border-b border-blue-100 shadow-sm sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-gray-600 hover:text-blue-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-blue-700">
              Consultant Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4 relative">
            {/* Theme */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full hover:bg-blue-100 text-gray-700"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-blue-100 text-gray-700">
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
            </button>

            {/* My Account */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
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
                    className="absolute right-0 mt-2 w-48 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <Link
                      href="/dashboard/consultant/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings size={16} className="text-blue-600" />
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

        {/* Dynamic child content */}
        <main className="flex-1 p-6 bg-white/70 backdrop-blur-sm overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-blue-100 bg-white/60 backdrop-blur-md text-sm text-gray-600 flex justify-between items-center">
          <p>© {new Date().getFullYear()} Supacare Solutions</p>
          <p className="text-blue-700 font-medium">
            Projects Active: <span className="font-bold">5</span> | Reports:{' '}
            <span className="font-bold">12</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
