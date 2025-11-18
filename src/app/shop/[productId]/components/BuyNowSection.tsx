'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface BuyNowSectionProps {
  productName: string
  imageSrc: string
  category?: string // e.g., "Compost", "Hardware", "Packaging"
  onAddToCart?: () => void // ✅ added to match page.tsx usage
}

export default function BuyNowSection({ productName, imageSrc, category, onAddToCart }: BuyNowSectionProps) {
  // 🧠 Detect color theme based on category
  const themes: Record<string, any> = {
    compost: {
      bg: 'bg-[#f6fff8]',
      primary: 'bg-[#1b4332]',
      secondary: 'bg-[#95d5b2]',
      accent: 'bg-[#F4B940]',
      text: 'text-[#1b4332]',
    },
    hardware: {
      bg: 'bg-[#f5f5f5]',
      primary: 'bg-[#444]',
      secondary: 'bg-[#9ca3af]',
      accent: 'bg-[#F4B940]',
      text: 'text-[#222]',
    },
    packaging: {
      bg: 'bg-[#fff9e5]',
      primary: 'bg-[#F4B940]',
      secondary: 'bg-[#ffec99]',
      accent: 'bg-[#1b4332]',
      text: 'text-[#1b4332]',
    },
    default: {
      bg: 'bg-[#fffef2]',
      primary: 'bg-[#1b4332]',
      secondary: 'bg-[#F4B940]',
      accent: 'bg-[#2d6a4f]',
      text: 'text-[#1b4332]',
    },
  }

  // Select theme based on product category
  const themeKey = category?.toLowerCase() || 'default'
  const theme = themes[themeKey] || themes.default

  const handleBuyNow = () => {
    // ✅ Trigger callback if parent wants to add to cart
    onAddToCart?.()
  }

  return (
    <section className={`relative ${theme.bg} py-20 px-6 sm:px-12 overflow-hidden`}>
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#F4B940]/30 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT: Text and buttons */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-4xl sm:text-5xl font-bold ${theme.text} leading-tight`}>
            Buy Your {productName}
          </h2>
          <p className="text-gray-700 text-lg">Message our team to make a purchase</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="https://www.facebook.com/SupacareSolutions"
              target="_blank"
              className={`${theme.accent} ${theme.text} px-6 py-3 rounded-full font-semibold hover:opacity-90 transition`}
              onClick={handleBuyNow} // ✅ optional hook to trigger addToCart
            >
              Buy on Facebook
            </Link>

            <Link
              href="https://www.instagram.com/supacaresolutions"
              target="_blank"
              className={`${theme.accent} ${theme.text} px-6 py-3 rounded-full font-semibold hover:opacity-90 transition`}
              onClick={handleBuyNow}
            >
              Buy on Instagram
            </Link>

            <Link
              href="https://wa.me/254700000000"
              target="_blank"
              className={`${theme.primary} text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition`}
              onClick={handleBuyNow}
            >
              Buy on WhatsApp
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Product image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden shadow-lg">
            <Image src={imageSrc} alt={productName} fill className="object-contain bg-white" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
