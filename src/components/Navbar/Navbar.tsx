'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'The Project',    href: '/the-project' },
  { label: 'Carbon Credits', href: '/carbon'      },
  { label: 'About',          href: '/about'       },
  { label: 'Contact',        href: '/contact'     },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    // reset on route change
    setScrolled(window.scrollY > 80)
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHeroPage = pathname === '/'

  return (
    <header
      data-navbar
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || !isHome
          ? 'bg-[#061209] border-b border-white/10'
          : 'bg-black/55'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/supalogo.webp"
            alt="Supacare"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === href
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: portal button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            Sign in
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/15 hover:bg-white/25 border border-white/30 transition-colors duration-200"
          >
            Partner portal
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#061209] border-t border-white/10 shadow-xl`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/auth/login"
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/15 border border-white/25 hover:bg-white/25 transition-colors text-center"
            >
              Partner portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
