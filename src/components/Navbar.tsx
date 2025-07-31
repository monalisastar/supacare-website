'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown,
  Leaf, Trash2, ListChecks, RefreshCcw
} from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Shop', href: '/shop' },
]

const services = [
  {
    name: 'Environmental & Carbon Consultancy',
    href: '/services/environmental-consultancy',
    icon: <Leaf size={16} />
  },
  {
    name: 'Waste Collection & Disposal',
    href: '/services/waste-collection',
    icon: <Trash2 size={16} />
  },
  {
    name: 'Smart Waste Tracking & Management',
    href: '/services/smart-waste',
    icon: <ListChecks size={16} />
  },
  {
    name: 'Recycling & Composting',
    href: '/services/recycling-composting',
    icon: <RefreshCcw size={16} />
  }
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

  const toggleAbout = () => {
    setMobileAboutOpen(!mobileAboutOpen)
    setMobileServicesOpen(false)
  }

  const toggleServices = () => {
    setMobileServicesOpen(!mobileServicesOpen)
    setMobileAboutOpen(false)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? 'bg-[#F4B940] border-b border-orange-200/40' : 'bg-[#F4B940]'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a href="/" className="flex items-center">
              <Image
                src="/images/supalogo.png"
                alt="Supacare Solutions Logo"
                width={128}
                height={64}
                className="object-contain h-16 w-auto"
                priority
              />
            </a>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold mt-2">
            <div className="relative group">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg flex items-center gap-1 transition shadow"
              >
                About Us <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bg-[#F4B940]/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-40 z-50"
                  >
                    <a href="/about" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Who We Are</a>
                    <a href="/team" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Our Team</a>
                    <a href="/careers" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Careers</a>
                    <a href="/contact" className="block px-4 py-2 text-sm hover:bg-white/10 transition text-green-700">Contact</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative group">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg flex items-center gap-1 transition shadow"
              >
                Services & Products <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bg-[#F4B940]/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 w-80 z-50"
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

            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg transition shadow"
              >
                {item.name}
              </a>
            ))}

            <a
              href="/contact"
              className="ml-2 bg-transparent hover:bg-green-700 hover:text-white text-green-800 px-4 py-2 rounded-lg transition shadow"
            >
              Request Service
            </a>
          </nav>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-green-700">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#F4B940] text-green-700 border-t border-orange-200/40 px-6 py-4 space-y-4">
          <div>
            <button
              onClick={toggleAbout}
              className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
            >
              About Us <ChevronDown size={16} className={`${mobileAboutOpen ? 'rotate-180' : ''} transition`} />
            </button>
            {mobileAboutOpen && (
              <div className="pl-4 mt-2 space-y-1">
                <a href="/about" className="block text-sm">Who We Are</a>
                <a href="/team" className="block text-sm">Our Team</a>
                <a href="/careers" className="block text-sm">Careers</a>
                <a href="/contact" className="block text-sm">Contact</a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={toggleServices}
              className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
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

          <div className="space-y-2">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm bg-white text-green-700 px-3 py-2 rounded-lg"
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="/contact"
            className="block bg-green-700 hover:bg-white text-white px-4 py-2 rounded-lg mt-4 text-center"
          >
            Request Service
          </a>
        </div>
      )}
    </header>
  )
}
