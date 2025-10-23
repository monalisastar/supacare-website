'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

type Announcement = {
  message: string
  link?: string
  phone?: string
  email?: string
}

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const barRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // ✅ Static/fallback announcement
  useEffect(() => {
    const fallbackAnnouncement: Announcement = {
      message:
        '📩 Contact us for direct consultancy: virginia.njat@gmail.com | 📞 0720096680',
      phone: '0720096680',
      email: 'virginia.njat@gmail.com',
    }
    setAnnouncement(fallbackAnnouncement)
  }, [])

  // ✅ Shift page down by bar height when visible (only if home)
  useEffect(() => {
    if (!isHome) return
    if (isVisible && barRef.current) {
      document.body.style.paddingTop = `${barRef.current.offsetHeight}px`
    } else {
      document.body.style.paddingTop = '0px'
    }
    return () => {
      document.body.style.paddingTop = '0px'
    }
  }, [isVisible, isHome])

  // ✅ Only render the bar on homepage
  if (!isHome || !announcement) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="announcement-bar"
          ref={barRef}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full px-4 py-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 fixed top-0 left-0 z-[60] text-center transition-all duration-500 bg-transparent text-white backdrop-blur-0"
        >
          <span className="text-sm md:text-base leading-snug">
            {announcement.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
