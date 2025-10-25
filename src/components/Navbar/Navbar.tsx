'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AnnouncementBar from '../AnnouncementBar'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import UserMenu from './UserMenu'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Hide navbar when scrolling down, show when scrolling up (desktop behavior)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentY = window.scrollY

      // ✅ On mobile: hide navbar after leaving Hero area (e.g. after 550px)
      if (window.innerWidth < 768) {
        if (currentY < 550) {
          setIsVisible(true) // still in Hero → visible
        } else {
          setIsVisible(false) // past Hero → hide completely
        }
      } else {
        // ✅ On desktop: normal scroll behavior
        if (currentY < 50) {
          setIsVisible(true)
        } else if (currentY > lastScrollY) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }

      setLastScrollY(currentY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (pathname?.startsWith('/dashboard')) return null

  const brightPages = ['/', '/projects']
  const isBright = brightPages.includes(pathname)

  return (
    <>
      {isHome && (
        <div className="hidden md:block">
          <AnnouncementBar />
        </div>
      )}

      {/* 🧭 Navbar with smooth hide/show */}
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed w-full z-50 transition-all ${
              isBright
                ? 'bg-transparent'
                : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between w-full px-6 pt-3 md:pt-0 absolute top-0 left-0 z-[60]">
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
                    className="object-contain w-auto h-[90px] sm:h-[100px] md:h-[130px] lg:h-[150px]"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
                      marginTop: '4px',
                    }}
                    priority
                  />
                </Link>
              </motion.div>

              {/* Desktop user menu */}
              <div
                className={`hidden md:flex items-center ${
                  isBright
                    ? 'text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
                    : 'text-green-800 hover:text-green-600 transition-colors'
                }`}
              >
                <UserMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              </div>

              {/* Mobile hamburger */}
              <div className="md:hidden flex items-center justify-end">
                <NavbarMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block relative mt-[130px] z-[40]">
              <NavbarDesktop />
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  )
}
