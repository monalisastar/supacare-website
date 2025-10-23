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

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (pathname?.startsWith('/dashboard')) return null

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
        {/* 🌿 Top Row (Logo left, UserMenu right) */}
        <div
          className="flex items-center justify-between w-full px-6 pt-4 md:pt-0 absolute top-0 left-0 z-[60]"
        >
          {/* ✅ Logo (left-aligned) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/images/supalogo.png"
                alt="Supacare Solutions Logo"
                width={400}
                height={180}
                className="object-contain w-auto h-[90px] md:h-[130px] lg:h-[150px]"
                style={{
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
                }}
                priority
              />
            </Link>
          </motion.div>

          {/* ✅ User Menu (right-aligned) */}
          <div
            className={`flex items-center ${
              isBright
                ? 'text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
                : 'text-green-800 hover:text-green-600 transition-colors'
            }`}
          >
            <UserMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>

        {/* 🟡 Desktop Navigation (unchanged) */}
        <div className="hidden md:block relative mt-[130px] z-[40]">
          <NavbarDesktop />
        </div>

        {/* 📱 Mobile Navigation (unchanged) */}
        <div className="md:hidden">
          <NavbarMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </header>
    </>
  )
}
