'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown,
  Leaf, Trash2, ListChecks, RefreshCcw, ShoppingCart
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ✅ Import announcement bar
import AnnouncementBar from './AnnouncementBar'

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
]

const services = [
  { name: 'Environmental & Carbon Consultancy', href: '/services/environmental-consultancy', icon: <Leaf size={16} /> },
  { name: 'Waste Collection & Disposal', href: '/services/waste-collection', icon: <Trash2 size={16} /> },
  { name: 'Smart Waste Tracking & Management', href: '/services/smart-waste', icon: <ListChecks size={16} /> },
  { name: 'Recycling & Composting', href: '/services/recycling-composting', icon: <RefreshCcw size={16} /> }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ✅ Don't render on /dashboard/*
  if (pathname?.startsWith('/dashboard')) return null

  // ✅ Scroll background change (safe for SSR)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false)
        setServicesOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen)
    setServicesOpen(false) // ✅ only one open at once
  }

  const toggleServices = () => {
    setServicesOpen(!servicesOpen)
    setAboutOpen(false) // ✅ only one open at once
  }

  const toggleMobileAbout = () => {
    setMobileAboutOpen(!mobileAboutOpen)
    setMobileServicesOpen(false)
  }

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen)
    setMobileAboutOpen(false)
  }

  return (
    <>
      {/* Announcement Bar - Desktop Only */}
      <div className="hidden md:block">
        <AnnouncementBar />
      </div>

      <header
        style={{ top: 'env(safe-area-inset-top)' }}
        className={`fixed w-full z-50 transition-all ${isScrolled
          ? 'bg-[#F4B940] border-b border-orange-200/40'
          : 'bg-[#F4B940]'
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* 🔹 Top Row: Logo + Shop/Cart */}
          <div className="flex justify-between items-center h-24 md:h-28">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 md:mt-8"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/supalogo.png"
                  alt="Supacare Solutions Logo"
                  width={224}
                  height={112}
                  className="object-contain w-[11vw] min-w-[170px] max-w-[240px] h-auto scale-110"
                  priority
                />
              </Link>
            </motion.div>

            {/* Right side desktop buttons */}
            <div className="hidden md:flex items-center gap-4 mt-8">
              <Link
                href="/shop"
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Visit Shop
              </Link>
              <Link
                href="/cart"
                aria-label="Cart"
                className="text-green-700 hover:text-green-900"
              >
                <ShoppingCart size={22} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center mt-6">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-green-700"
                aria-expanded={menuOpen}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* 🔹 Bottom Row: Centered Nav */}
          <div className="hidden md:flex justify-center border-t border-orange-200/40 mt-2">
            <nav
              ref={dropdownRef}
              data-navbar
              className="flex items-center gap-4 text-sm font-semibold py-2"
            >
              {/* Home Button */}
              <Link
                href="/"
                className="bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg transition shadow"
              >
                Home
              </Link>

              {/* About Us Dropdown */}
              <div className="relative group dropdown">
                <button
                  onClick={toggleAbout}
                  aria-expanded={aboutOpen}
                  aria-controls="about-menu"
                  className="bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg flex items-center gap-1 transition shadow"
                >
                  About Us <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      id="about-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute bg-[#F4B940]/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-40 z-50"
                    >
                      <Link href="/about" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Who We Are</Link>
                      <Link href="/team" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Our Team</Link>
                      <Link href="/careers" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Careers</Link>
                      <Link href="/contact" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Contact</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Dropdown */}
              <div className="relative group dropdown">
                <button
                  onClick={toggleServices}
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  className="bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg flex items-center gap-1 transition shadow"
                >
                  Services & Products <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      id="services-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute bg-[#F4B940]/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-80 z-50"
                    >
                      <Link
                        href="/services"
                        className="block px-4 py-2 text-sm font-medium text-green-800 hover:bg-white/10 transition border-b border-white/30"
                      >
                        🌿 View All Services
                      </Link>
                      {services.map(({ name, href, icon }) => (
                        <Link key={href} href={href} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">
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
                  className="bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg transition shadow"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/contact"
                className="ml-2 bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-4 py-2 rounded-lg transition shadow"
              >
                Request Service
              </Link>
            </nav>
          </div>
        </div>

        {/* 🔹 Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ paddingTop: `env(safe-area-inset-top)` }}
              className="md:hidden bg-[#F4B940] text-green-700 border-t border-orange-200/40 px-6 py-4 space-y-4"
            >
              {/* Home */}
              <Link
                href="/"
                className="block text-sm bg-white text-green-700 px-3 py-2 rounded-lg"
              >
                Home
              </Link>

              <div>
                <button
                  onClick={toggleMobileAbout}
                  aria-expanded={mobileAboutOpen}
                  aria-controls="mobile-about-menu"
                  className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
                >
                  About Us <ChevronDown size={16} className={`${mobileAboutOpen ? 'rotate-180' : ''} transition`} />
                </button>
                {mobileAboutOpen && (
                  <div id="mobile-about-menu" className="pl-4 mt-2 space-y-1">
                    <Link href="/about" className="block text-sm">Who We Are</Link>
                    <Link href="/team" className="block text-sm">Our Team</Link>
                    <Link href="/careers" className="block text-sm">Careers</Link>
                    <Link href="/contact" className="block text-sm">Contact</Link>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={toggleMobileServices}
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-menu"
                  className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
                >
                  Services & Products <ChevronDown size={16} className={`${mobileServicesOpen ? 'rotate-180' : ''} transition`} />
                </button>
                {mobileServicesOpen && (
                  <div id="mobile-services-menu" className="pl-4 mt-2 space-y-1">
                    <Link href="/services" className="block text-sm font-medium text-green-800">🌿 View All Services</Link>
                    {services.map(({ name, href, icon }) => (
                      <Link key={href} href={href} className="flex items-center gap-2 text-sm py-1">
                        {icon}
                        {name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm bg-white text-green-700 px-3 py-2 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                className="block bg-green-700 hover:bg-white text-white hover:text-green-700 px-4 py-2 rounded-lg mt-4 text-center transition"
              >
                Request Service
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
