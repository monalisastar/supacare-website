'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AnnouncementBar from '../AnnouncementBar'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import UserMenu from './UserMenu'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // ✅ Detect scroll for optional styling (if needed later)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ✅ Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // 🚫 Hide navbar on dashboard routes
  if (pathname?.startsWith('/dashboard')) return null

  // ✅ Pages with dark or image backgrounds
  const brightPages = ['/', '/projects']
  const isBright = brightPages.includes(pathname)

  return (
    <>
      {/* ✅ Announcement Bar — Only show on homepage */}
      {isHome && (
        <div className="hidden md:block">
          <AnnouncementBar />
        </div>
      )}

      {/* 🧭 Main Navbar */}
      <header
        className={`fixed w-full z-50 transition-all ${
          isBright
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        {/* 🌿 Floating User Menu (Register / Login / Shop) */}
        <div
          className={`absolute top-0 right-6 flex justify-end items-center mt-[40px] z-[60] ${
            isBright
              ? 'text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
              : 'text-green-800 hover:text-green-600 transition-colors'
          }`}
        >
          <UserMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>

        {/* ✅ Floating Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-8 z-[60]"
          style={{
            transform: 'translateY(65px)',
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

        {/* 🟡 Desktop Navigation */}
        <div className="hidden md:block relative mt-[130px] z-[40]">
          <NavbarDesktop />
        </div>

        {/* 📱 Mobile Navigation */}
        <div className="md:hidden">
          <NavbarMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </header>
    </>
  )
}
