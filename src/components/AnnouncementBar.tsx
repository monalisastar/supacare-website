'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  // ✅ Shift page down by bar height when visible
  useEffect(() => {
    if (isVisible && barRef.current) {
      document.body.style.paddingTop = `${barRef.current.offsetHeight}px`
    } else {
      document.body.style.paddingTop = '0px'
    }
    return () => {
      document.body.style.paddingTop = '0px'
    }
  }, [isVisible])

  if (!announcement) return null

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
          className="w-full bg-blue-600 text-white px-4 py-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 fixed top-0 left-0 z-[60] shadow-md text-center"
        >
          <span className="text-sm md:text-base leading-snug">
            {announcement.message}
          </span>
          {/* ⛔ Removed dismiss button since it's always visible */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
