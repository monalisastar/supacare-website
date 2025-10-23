'use client'

import React from 'react' // ✅ add this to provide JSX namespace
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, User, ShoppingCart,
  Leaf, Trash2, ListChecks, RefreshCcw
} from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

type Service = {
  name: string
  href: string
  icon: React.ReactNode // ✅ safer and avoids “Cannot find namespace 'JSX'”
}

const services: Service[] = [
  { name: 'Environmental & Carbon Consultancy', href: '/services/environmental-consultancy', icon: <Leaf size={16} /> },
  { name: 'Waste Collection & Disposal', href: '/services/waste-collection', icon: <Trash2 size={16} /> },
  { name: 'Smart Waste Tracking & Management', href: '/services/smart-waste', icon: <ListChecks size={16} /> },
  { name: 'Recycling & Composting', href: '/services/recycling-composting', icon: <RefreshCcw size={16} /> },
]

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
]

export default function NavbarDesktop() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false)
        setServicesOpen(false)
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen)
    setServicesOpen(false)
  }

  const toggleServices = () => {
    setServicesOpen(!servicesOpen)
    setAboutOpen(false)
  }

  return (
    <div className="hidden md:block relative">
      {/* 🟡 Main Navbar */}
      <div className="relative bg-[#F4B940] border-t border-orange-200/40 z-[40] mt-[130px]">
        <div className="flex justify-center">
          <nav ref={dropdownRef} className="flex items-center gap-4 text-sm font-semibold py-2">
            <Link
              href="/"
              className="hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg transition shadow"
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative group dropdown">
              <button
                onClick={toggleAbout}
                className="hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg flex items-center gap-1 transition shadow"
              >
                About Us <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-[#F4B940]/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-40 z-50"
                  >
                    <Link href="/about" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">
                      Who We Are
                    </Link>
                    <Link href="/team" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">
                      Our Team
                    </Link>
                    <Link href="/careers" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">
                      Careers
                    </Link>
                    <Link href="/contact" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">
                      Contact
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative group dropdown">
              <button
                onClick={toggleServices}
                className="hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg flex items-center gap-1 transition shadow"
              >
                Services & Products <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-[#F4B940]/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-80 z-50"
                  >
                    <Link
                      href="/services"
                      className="block px-4 py-2 text-sm font-medium text-green-800 hover:bg-white/10 border-b border-white/30"
                    >
                      🌿 View All Services
                    </Link>
                    {services.map(({ name, href, icon }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 text-green-700"
                      >
                        {icon}
                        {name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg transition shadow"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/contact"
              className="ml-2 hover:bg-green-700 hover:text-white text-green-800 px-4 py-2 rounded-lg transition shadow"
            >
              Request Service
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
