'use client'

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, User, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

type UserMenuProps = {
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export default function UserMenu({ menuOpen, setMenuOpen }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const pathname = usePathname()
  const isHome = pathname === '/'

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const baseBtn = isHome
    ? 'border-white text-white hover:bg-white/10'
    : 'border-green-800 text-green-800 hover:bg-green-50'
  const iconColor = isHome
    ? 'text-white hover:text-green-100'
    : 'text-green-800 hover:text-green-600'

  const handleInteraction = () => {
    if (menuOpen) setMenuOpen(false)
  }

  return (
    <div
      className="flex items-center flex-nowrap gap-1 sm:gap-2 md:gap-4 ml-auto mr-2 md:mr-6"
      style={{
        overflow: 'hidden',
        flexShrink: 1,
        maxWidth: '80vw', // prevent overflow on smaller screens
      }}
    >
      {/* 👤 User or Auth Buttons */}
      {!isAuthenticated ? (
        <>
          <Link
            href="/auth/register"
            onClick={handleInteraction}
            className={`border px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm md:text-base transition ${baseBtn}`}
          >
            Register
          </Link>
          <Link
            href="/auth/login"
            onClick={handleInteraction}
            className={`border px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm md:text-base transition ${baseBtn}`}
          >
            Login
          </Link>
        </>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-1 sm:gap-2 border px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm md:text-base transition ${baseBtn}`}
          >
            <User size={18} />
            <span>{session?.user?.name ?? 'My Account'}</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50"
              >
                <Link
                  href="/dashboard"
                  onClick={() => {
                    handleInteraction()
                    setIsOpen(false)
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 text-green-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' })
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 🛍️ Shop & Cart Buttons */}
      <Link
        href="/shop"
        onClick={handleInteraction}
        className={`border px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm md:text-base transition ${baseBtn}`}
      >
        Visit Shop
      </Link>

      <Link
        href="/cart"
        onClick={handleInteraction}
        aria-label="Cart"
        className={`${iconColor} transition`}
      >
        <ShoppingCart size={20} />
      </Link>
    </div>
  )
}
