'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/CartContext'
import Link from 'next/link'
import { ShoppingBag, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InquiryPanelProps {
  id: string
  name: string
  price: number
  image: string
  onAddToCart?: () => void // ✅ Added optional prop for parent callback
}

export default function InquiryPanel({ id, name, price, image, onAddToCart }: InquiryPanelProps) {
  const { addToCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      image,
      price,
      quantity: 1,
    })

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 4000)

    // ✅ Trigger callback if provided
    onAddToCart?.()
  }

  const whatsappLink = `https://wa.me/254720096680?text=${encodeURIComponent(
    `Hello Supacare! 👋 I’m interested in the ${name} product. Could you share more details and pricing info?`
  )}`

  return (
    <aside className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit self-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm space-y-6"
      >
        {/* 💰 Product Pricing */}
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Pricing Overview
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-medium">KES {(price * 1.2).toLocaleString()}</p>
              <p>300–499 pieces</p>
            </div>
            <div>
              <p className="font-medium">KES {price.toLocaleString()}</p>
              <p>≥ 500 pieces</p>
            </div>
          </div>
        </div>

        {/* 📦 Order Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Minimum Order Quantity: <strong>300 pieces</strong>
        </div>

        {/* 🛒 Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2.5 rounded-lg transition"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>

        {/* ✅ Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3"
            >
              <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                ✅ {name} added to cart successfully!
              </p>
              <Link
                href="/cart"
                className="text-green-700 dark:text-green-400 text-sm underline mt-1 inline-block hover:text-green-900 transition"
              >
                View Cart →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🌿 Branding */}
        <div className="text-sm text-gray-600 dark:text-gray-400 border-t pt-4 text-center">
          <p className="font-medium text-green-700 dark:text-green-400">Supacare</p>
          <p>Your trusted partner in sustainable living</p>
        </div>
      </motion.div>
    </aside>
  )
}
