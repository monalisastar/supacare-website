'use client'

import React from 'react' // ✅ fixes JSX namespace issue
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export type DropdownLink = {
  name: string
  href: string
  icon?: React.ReactNode // ✅ changed from JSX.Element to React.ReactNode
}

type NavDropdownProps = {
  label: string
  links: DropdownLink[]
  highlightLink?: string // e.g. "View All Services"
  highlightHref?: string
  highlightIcon?: React.ReactNode // ✅ updated here too
  width?: string // e.g. "w-40" or "w-80"
}

export default function NavDropdown({
  label,
  links,
  highlightLink,
  highlightHref,
  highlightIcon,
  width = 'w-48',
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="relative group dropdown" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-green-700 hover:text-white text-green-800 px-3 py-2 rounded-lg flex items-center gap-1 transition shadow"
      >
        {label} <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute bg-[#F4B940]/90 backdrop-blur-lg border border-white/50 rounded shadow-lg py-2 mt-2 ${width} z-50`}
          >
            {/* Optional top highlight link */}
            {highlightLink && highlightHref && (
              <Link
                href={highlightHref}
                className="block px-4 py-2 text-sm font-medium text-green-800 hover:bg-white/10 border-b border-white/30"
              >
                {highlightIcon && <span className="inline-block mr-2">{highlightIcon}</span>}
                {highlightLink}
              </Link>
            )}

            {/* List of links */}
            {links.map(({ name, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 text-green-700"
              >
                {icon}
                {name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
