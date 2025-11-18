'use client'

import { useCart } from '@/lib/CartContext'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CartWidget() {
  const { cart } = useCart()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Hide on cart page itself
  if (pathname?.includes('/cart')) return null

  // Count total items
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Detect screen size for mobile adjustments
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-6 z-50 ${
            isMobile ? 'right-20' : 'right-6'
          }`}
        >
          <Link
            href="/cart"
            className="relative flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg transition-all duration-300"
            aria-label="View Cart"
          >
            <ShoppingBag size={26} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-semibold rounded-full px-2 py-0.5 shadow">
                {itemCount}
              </span>
            )}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
