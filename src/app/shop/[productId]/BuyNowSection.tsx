'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface BuyNowSectionProps {
  productName: string
  imageSrc: string
  category?: string
}

export default function BuyNowSection({ productName, imageSrc, category }: BuyNowSectionProps) {
  const [countryCode, setCountryCode] = useState('254') // Default to Kenya 🇰🇪

  // 🌍 Detect user's country via IP
  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        if (data.country_calling_code) {
          const code = data.country_calling_code.replace('+', '')
          setCountryCode(code)
        }
      } catch (err) {
        console.warn('Could not detect country. Using default Kenya (254).')
      }
    }
    detectCountry()
  }, [])

  // 🧠 Color theme
  const themes: Record<string, any> = {
    compost: {
      bg: 'bg-[#f6fff8]',
      primary: 'bg-[#1b4332]',
      accent: 'bg-[#F4B940]',
      text: 'text-[#1b4332]',
    },
    hardware: {
      bg: 'bg-[#f5f5f5]',
      primary: 'bg-[#444]',
      accent: 'bg-[#F4B940]',
      text: 'text-[#222]',
    },
    packaging: {
      bg: 'bg-[#fff9e5]',
      primary: 'bg-[#F4B940]',
      accent: 'bg-[#1b4332]',
      text: 'text-[#1b4332]',
    },
    default: {
      bg: 'bg-[#fffef2]',
      primary: 'bg-[#1b4332]',
      accent: 'bg-[#F4B940]',
      text: 'text-[#1b4332]',
    },
  }

  const themeKey = category?.toLowerCase() || 'default'
  const theme = themes[themeKey] || themes.default

  // 💬 Personalized WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hello Supacare Team 👋, I’m interested in buying *${productName}*. Could you please share the price and delivery details?`
  )

  const whatsappLink = `https://wa.me/${countryCode}700000000?text=${whatsappMessage}`

  return (
    <section className={`relative ${theme.bg} py-20 px-6 sm:px-12 overflow-hidden`}>
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#F4B940]/30 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT SIDE */}
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
            >
              Buy on Facebook
            </Link>

            <Link
              href="https://www.instagram.com/supacaresolutions"
              target="_blank"
              className={`${theme.accent} ${theme.text} px-6 py-3 rounded-full font-semibold hover:opacity-90 transition`}
            >
              Buy on Instagram
            </Link>

            <Link
              href={whatsappLink}
              target="_blank"
              className={`${theme.primary} text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition`}
            >
              Buy on WhatsApp
            </Link>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
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
