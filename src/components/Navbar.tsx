'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown,
  Leaf, Trash2, ListChecks, RefreshCcw, ShoppingCart, User
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AnnouncementBar from './AnnouncementBar'
import { useSession, signOut } from 'next-auth/react'

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
]

const services = [
  { name: 'Environmental & Carbon Consultancy', href: '/services/environmental-consultancy', icon: <Leaf size={16} /> },
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
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  useEffect(() => {
    setMenuOpen(false)
    setMobileAboutOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen)
    setServicesOpen(false)
  }

  const toggleServices = () => {
    setServicesOpen(!servicesOpen)
    setAboutOpen(false)
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
      {!pathname?.startsWith('/dashboard') && (
        <>
          <div className="hidden md:block">
            <AnnouncementBar />
          </div>

          <header className="fixed w-full z-50 transition-all">
            {/* 🌿 Transparent Top Navbar */}
            <div
              className={`absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 transition-all mt-[40px] ${
                isScrolled ? 'bg-transparent' : 'bg-transparent'
              }`}
              style={{
                backdropFilter: 'none',
                backgroundColor: 'transparent',
                zIndex: 45, // below logo but above background
              }}
            >
              {/* ✅ Transparent Top Buttons */}
              <div className="hidden md:flex items-center gap-4 ml-auto mr-6">
                {isAuthenticated ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
                    >
                      <User size={18} />
                      <span>{session?.user?.name ?? 'My Account'}</span>
                      <ChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50"
                        >
                          <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-green-800">
                            Dashboard
                          </Link>
                          <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth/register"
                      className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
                    >
                      Register
                    </Link>
                    <Link
                      href="/auth/login"
                      className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
                    >
                      Login
                    </Link>
                  </>
                )}

                <Link
                  href="/shop"
                  className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  Visit Shop
                </Link>
                <Link href="/cart" aria-label="Cart" className="text-white hover:text-green-200 transition">
                  <ShoppingCart size={22} />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                  {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>

            {/* ✅ Independent Floating Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-8 z-[60]"
              style={{
                transform: 'translateY(65px)', // logo position independent of buttons
              }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/supalogo.png"
                  alt="Supacare Solutions Logo"
                  width={400}
                  height={180}
                  className="object-contain w-auto h-[110px] md:h-[130px] lg:h-[150px]"
                  style={{
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
                  }}
                  priority
                />
              </Link>
            </motion.div>

            {/* 🟡 Main Navbar */}
            <div className="relative mt-[130px] bg-[#F4B940] border-t border-orange-200/40 z-[40]">
              <div className="flex justify-center">
                <nav ref={dropdownRef} className="flex items-center gap-4 text-sm font-semibold py-2">
                  <Link href="/" className="hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg transition shadow">
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
                          <Link href="/about" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">Who We Are</Link>
                          <Link href="/team" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">Our Team</Link>
                          <Link href="/careers" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">Careers</Link>
                          <Link href="/contact" className="block px-4 py-2 text-sm hover:bg-white/10 text-green-700">Contact</Link>
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
                          <Link href="/services" className="block px-4 py-2 text-sm font-medium text-green-800 hover:bg-white/10 border-b border-white/30">
                            🌿 View All Services
                          </Link>
                          {services.map(({ name, href, icon }) => (
                            <Link key={href} href={href} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 text-green-700">
                              {icon}
                              {name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {navItems.map(item => (
                    <Link key={item.name} href={item.href} className="hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg transition shadow">
                      {item.name}
                    </Link>
                  ))}

                  <Link href="/contact" className="ml-2 hover:bg-green-700 hover:text-white text-green-800 px-4 py-2 rounded-lg transition shadow">
                    Request Service
                  </Link>
                </nav>
              </div>
            </div>

            {/* 📱 Mobile Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden bg-[#F4B940] text-green-700 border-t border-orange-200/40 px-6 py-4 space-y-4 mt-[100px]"
                >
                  <Link href="/" className="block text-sm bg-white text-green-700 px-3 py-2 rounded-lg">
                    Home
                  </Link>

                  {/* About (Mobile) */}
                  <div>
                    <button
                      onClick={toggleMobileAbout}
                      className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
                    >
                      About Us <ChevronDown size={16} className={`${mobileAboutOpen ? 'rotate-180' : ''} transition`} />
                    </button>
                    {mobileAboutOpen && (
                      <div className="pl-4 mt-2 space-y-1">
                        <Link href="/about" className="block text-sm">Who We Are</Link>
                        <Link href="/team" className="block text-sm">Our Team</Link>
                        <Link href="/careers" className="block text-sm">Careers</Link>
                        <Link href="/contact" className="block text-sm">Contact</Link>
                      </div>
                    )}
                  </div>

                  {/* Services (Mobile) */}
                  <div>
                    <button
                      onClick={toggleMobileServices}
                      className="w-full text-left font-semibold flex items-center justify-between bg-white text-green-700 px-3 py-2 rounded-lg"
                    >
                      Services & Products <ChevronDown size={16} className={`${mobileServicesOpen ? 'rotate-180' : ''} transition`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 mt-2 space-y-1">
                        <Link href="/services" className="block text-sm font-medium text-green-800">
                          🌿 View All Services
                        </Link>
                        {services.map(({ name, href, icon }) => (
                          <Link key={href} href={href} className="flex items-center gap-2 text-sm py-1">
                            {icon}
                            {name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {navItems.map(item => (
                    <Link key={item.name} href={item.href} className="block text-sm bg-white text-green-700 px-3 py-2 rounded-lg">
                      {item.name}
                    </Link>
                  ))}

                  <Link
                    href="/contact"
                    className="block bg-green-700 text-white px-4 py-2 rounded-lg mt-4 text-center transition"
                  >
                    Request Service
                  </Link>

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
                      <Link href="/dashboard" className="block text-center bg-white text-green-700 px-4 py-2 rounded-lg">
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
              )}
            </AnimatePresence>
          </header>
        </>
      )}
    </>
  )
}
