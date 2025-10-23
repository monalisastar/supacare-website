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
    <div className="md:hidden">
      {/* 📱 Top bar: hamburger color adapts to background */}
      <div className="flex items-center justify-end px-6 py-4 z-[100] relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`transition-colors ${
            isBright ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-800 hover:text-green-600'
          }`}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📜 Full-screen overlay dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[9997]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown menu content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-[#F4B940] text-green-800 z-[9999] px-6 py-6 space-y-4"
            >
              <Link href="/" className="block text-sm bg-white text-green-700 px-3 py-2 rounded-lg">
                Home
              </Link>

              {/* About Dropdown */}
              <div>
                <button
                  onClick={toggleAbout}
                  className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
                >
                  About Us
                  <ChevronDown
                    size={16}
                    className={`${aboutOpen ? 'rotate-180' : ''} transition-transform`}
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
                    >
                      <Link href="/about" className="block text-sm">Who We Are</Link>
                      <Link href="/team" className="block text-sm">Our Team</Link>
                      <Link href="/careers" className="block text-sm">Careers</Link>
                      <Link href="/contact" className="block text-sm">Contact</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Dropdown */}
              <div>
                <button
                  onClick={toggleServices}
                  className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
                >
                  Services & Products
                  <ChevronDown
                    size={16}
                    className={`${servicesOpen ? 'rotate-180' : ''} transition-transform`}
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
                    >
                      <Link href="/services" className="block text-sm font-medium text-green-800">
                        🌿 View All Services
                      </Link>
                      {services.map(({ name, href, icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2 text-sm py-1"
                        >
                          {icon}
                          {name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Static nav links */}
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm bg-white text-green-700 px-3 py-2 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}

              {/* CTA */}
              <Link
                href="/contact"
                className="block bg-green-700 text-white px-4 py-2 rounded-lg mt-4 text-center transition"
              >
                Request Service
              </Link>

              {/* Auth / Dashboard */}
              {!isAuthenticated && (
                <>
                  <Link
                    href="/auth/register"
                    className="block bg-white text-green-700 px-4 py-2 rounded-lg mt-2 text-center"
                  >
                    Register
                  </Link>
                  <Link
                    href="/auth/login"
                    className="block bg-green-700 text-white px-4 py-2 rounded-lg mt-2 text-center"
                  >
                    Login
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <div className="pt-2 border-t border-orange-300 mt-4 space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-center bg-white text-green-700 px-4 py-2 rounded-lg"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="block w-full text-center bg-red-600 text-white px-4 py-2 rounded-lg"
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
