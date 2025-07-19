'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown,
  Calculator, Leaf, Trash2, Map, ListChecks, RefreshCcw
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
]

const services = [
  { name: 'Calculate Carbon Footprint', href: '/services/carbon-footprint', icon: <Calculator size={16} /> },
  { name: 'Environmental Consultancy', href: '/services/environmental-consultancy', icon: <Leaf size={16} /> },
  { name: 'Carbon Advisory', href: '/services/carbon-advisory', icon: <Map size={16} /> },
  { name: 'Waste Collection & Disposal', href: '/services/waste-collection', icon: <Trash2 size={16} /> },
  { name: 'Smart Waste Tracking & Management', href: '/services/smart-waste', icon: <ListChecks size={16} /> },
  { name: 'Recycling & Composting', href: '/services/recycling-composting', icon: <RefreshCcw size={16} /> },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  const toggleAbout = () => {
    setMobileAboutOpen(!mobileAboutOpen)
    setMobileServicesOpen(false)
  }

  const toggleServices = () => {
    setMobileServicesOpen(!mobileServicesOpen)
    setMobileAboutOpen(false)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? 'bg-white/20 backdrop-blur-md border-b border-white/10' : 'bg-white/10 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-green-700 font-bold text-xl"
          >
            supaCare
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-green-600 text-sm font-semibold">
            {/* About Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center gap-1 text-green-600 font-semibold hover:text-green-800 hover:bg-green-100/30 rounded px-2 py-1 transition"
              >
                About Us <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bg-white/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-40 z-50"
                  >
                    <a href="/about" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Who We Are</a>
                    <a href="/team" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Our Team</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-green-600 font-semibold hover:text-green-800 hover:bg-green-100/30 rounded px-2 py-1 transition"
              >
                Services & Products <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bg-white/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-80 z-50"
                  >
                    <a
                      href="/services"
                      className="block px-4 py-2 text-sm font-medium text-green-800 hover:bg-white/10 transition border-b border-white/30"
                    >
                      🌿 View All Services
                    </a>
                    {services.map(({ name, href, icon }) => (
                      <a key={href} href={href} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">
                        {icon}
                        {name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static Nav Items */}
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className={`hover:text-green-800 hover:bg-green-100/30 rounded px-2 py-1 transition ${
                  isActive(item.href) ? 'text-green-700' : ''
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* CTA */}
            <a
              href="/request"
              className="ml-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition shadow"
            >
              Request Service
            </a>
          </nav>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-green-700">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/10 text-green-700 px-6 py-4 space-y-4">
          {/* About Us */}
          <div>
            <button
              onClick={toggleAbout}
              className="w-full text-left font-semibold flex items-center justify-between"
            >
              About Us <ChevronDown size={16} className={`${mobileAboutOpen ? 'rotate-180' : ''} transition`} />
            </button>
            {mobileAboutOpen && (
              <div className="pl-4 mt-2 space-y-1">
                <a href="/about" className="block text-sm">Who We Are</a>
                <a href="/team" className="block text-sm">Our Team</a>
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <button
              onClick={toggleServices}
              className="w-full text-left font-semibold flex items-center justify-between"
            >
              Services & Products <ChevronDown size={16} className={`${mobileServicesOpen ? 'rotate-180' : ''} transition`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 mt-2 space-y-1">
                <a href="/services" className="block text-sm font-medium text-green-800">🌿 View All Services</a>
                {services.map(({ name, href, icon }) => (
                  <a key={href} href={href} className="flex items-center gap-2 text-sm py-1">
                    {icon}
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Static Links */}
          <div className="space-y-2">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className={`block text-sm ${isActive(item.href) ? 'text-green-700' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="/request"
            className="block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg mt-4 text-center"
          >
            Request Service
          </a>
        </div>
      )}
    </header>
  )
}
