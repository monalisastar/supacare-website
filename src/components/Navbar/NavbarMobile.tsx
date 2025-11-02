'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Menu, X,
  Leaf, Trash2, ListChecks, RefreshCcw
} from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

type NavbarMobileProps = {
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

const services = [
  { name: 'Environmental & Carbon Consultancy', href: '/services/environmental-consultancy', icon: <Leaf size={16} /> },
  { name: 'Waste Collection & Disposal', href: '/services/waste-collection', icon: <Trash2 size={16} /> },
  { name: 'Smart Waste Tracking & Management', href: '/services/smart-waste', icon: <ListChecks size={16} /> },
  { name: 'Recycling & Composting', href: '/services/recycling-composting', icon: <RefreshCcw size={16} /> },
]

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
]

export default function NavbarMobile({ menuOpen, setMenuOpen }: NavbarMobileProps) {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const pathname = usePathname()

  const brightPages = ['/', '/projects']
  const isBright = brightPages.includes(pathname)

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen)
    setServicesOpen(false)
  }

  const toggleServices = () => {
    setServicesOpen(!servicesOpen)
    setAboutOpen(false)
  }

  return (
    <div
      className="md:hidden fixed top-0 left-0 w-full z-[10000]"
      role="navigation"
      aria-label="Mobile Navigation"
    >
      {/* 📱 Top bar */}
      <div className="flex items-center justify-end px-6 py-4 relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close main menu' : 'Open main menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={`transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 ${
            isBright ? 'text-yellow-500 hover:text-yellow-400' : 'text-green-800 hover:text-green-600'
          }`}
        >
          {menuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </div>

      {/* 📜 Overlay & Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[9998]"
              onClick={() => setMenuOpen(false)}
            />

            {/* dropdown content */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-[#e6a800] text-green-900 z-[9999] px-6 pt-[100px] pb-10 space-y-4"
            >
              {/* Home */}
              <Link
                href="/"
                className="block text-base bg-white text-green-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                Home
              </Link>

              {/* About dropdown */}
              <div>
                <button
                  onClick={toggleAbout}
                  aria-expanded={aboutOpen}
                  aria-haspopup="true"
                  aria-label="Toggle About Us section"
                  className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  About Us
                  <ChevronDown
                    size={16}
                    className={`${aboutOpen ? 'rotate-180' : ''} transition-transform`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 space-y-1"
                      role="menu"
                      aria-label="About Us links"
                    >
                      <Link href="/about" className="block text-base">Who We Are</Link>
                      <Link href="/team" className="block text-base">Our Team</Link>
                      <Link href="/careers" className="block text-base">Careers</Link>
                      <Link href="/contact" className="block text-base">Contact</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services dropdown */}
              <div>
                <button
                  onClick={toggleServices}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-label="Toggle Services and Products section"
                  className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  Services & Products
                  <ChevronDown
                    size={16}
                    className={`${servicesOpen ? 'rotate-180' : ''} transition-transform`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 space-y-1"
                      role="menu"
                      aria-label="Services links"
                    >
                      <Link href="/services" className="block text-base font-medium text-green-900">
                        🌿 View All Services
                      </Link>
                      {services.map(({ name, href, icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2 text-base py-1 text-green-900 hover:text-green-700"
                        >
                          {icon}
                          {name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Static links */}
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base bg-white text-green-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  {item.name}
                </Link>
              ))}

              {/* CTA */}
              <Link
                href="/contact"
                className="block bg-green-700 text-white px-4 py-2 rounded-lg mt-4 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Request Service
              </Link>

              {/* Auth links */}
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/auth/register"
                    className="block bg-white text-green-800 px-4 py-2 rounded-lg mt-2 text-center focus:outline-none focus:ring-2 focus:ring-green-700"
                  >
                    Register
                  </Link>
                  <Link
                    href="/auth/login"
                    className="block bg-green-700 text-white px-4 py-2 rounded-lg mt-2 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div className="pt-2 border-t border-orange-300 mt-4 space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-center bg-white text-green-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    aria-label="Sign out of your account"
                    className="block w-full text-center bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
