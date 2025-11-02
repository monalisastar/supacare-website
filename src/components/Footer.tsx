"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Mail, Phone, MapPin,
  Facebook, Linkedin, Instagram, Twitter, MessageCircle, Youtube
} from "lucide-react"
import { usePathname } from "next/navigation"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [language, setLanguage] = useState("English")
  const pathname = usePathname()

  // ✅ Hide footer on dashboard pages
  if (pathname?.startsWith("/dashboard")) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email subscribed:", email)
    setEmail("")
  }

  return (
    <footer
      className="bg-[#1b4332] text-[#f5f5f0] px-6 sm:px-12 pt-16 pb-24 sm:pb-16 relative"
      role="contentinfo"
      aria-label="Website Footer"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Supacare Solutions Footer
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* ✅ Logo + Tagline + Socials */}
        <div>
          <Image
            src="/images/supalogo.webp"
            alt="Supacare Solutions Logo"
            width={180}
            height={80}
            className="mb-4"
          />
          <p className="text-[15px] text-gray-200 mb-6 leading-relaxed">
            Sustainable solutions for a cleaner, greener tomorrow.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4" aria-label="Social Media Links">
            <a
              href="https://www.linkedin.com/company/supacaresolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Supacare Solutions on LinkedIn"
              className="hover:text-[#fcbf49] focus:outline-none focus:ring-2 focus:ring-[#fcbf49] rounded"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/supacareltd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Supacare on Twitter"
              className="hover:text-[#fcbf49] focus:outline-none focus:ring-2 focus:ring-[#fcbf49] rounded"
            >
              <Twitter size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/supacaresolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Supacare on Facebook"
              className="hover:text-[#fcbf49] focus:outline-none focus:ring-2 focus:ring-[#fcbf49] rounded"
            >
              <Facebook size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/supacaresolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Supacare on Instagram"
              className="hover:text-[#fcbf49] focus:outline-none focus:ring-2 focus:ring-[#fcbf49] rounded"
            >
              <Instagram size={20} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/254720096680"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Supacare on WhatsApp"
              className="hover:text-[#fcbf49] focus:outline-none focus:ring-2 focus:ring-[#fcbf49] rounded"
            >
              <MessageCircle size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@supacaresolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Supacare Solutions YouTube Channel"
              className="hover:text-[#fcbf49] focus:outline-none focus:ring-2 focus:ring-[#fcbf49] rounded"
            >
              <Youtube size={20} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ✅ Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-[15px]">
            <li>
              <Link href="/services/recycling-composting" aria-label="Learn about Recycling and Composting" className="hover:text-[#fcbf49]">
                Recycling & Composting
              </Link>
            </li>
            <li>
              <Link href="/services/environmental-consultancy" aria-label="Learn about Environmental Consultancy" className="hover:text-[#fcbf49]">
                Environmental Consultancy
              </Link>
            </li>
            <li>
              <Link href="/services/waste-collection" aria-label="Learn about Waste Collection and Disposal" className="hover:text-[#fcbf49]">
                Waste Collection & Disposal
              </Link>
            </li>
            <li>
              <Link href="/services/smart-waste" aria-label="Learn about Smart Waste Tracking" className="hover:text-[#fcbf49]">
                Smart Waste Tracking
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-[15px]">
            <li><Link href="/about-us" className="hover:text-[#fcbf49]">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-[#fcbf49]">Careers</Link></li>
            <li><Link href="/projects" className="hover:text-[#fcbf49]">Projects</Link></li>
            <li><Link href="/faq" className="hover:text-[#fcbf49]">FAQ</Link></li>
          </ul>
        </div>

        {/* ✅ Contact + Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-[15px] text-gray-200">
            <li className="flex items-center gap-2">
              <Mail size={16} aria-hidden="true" /> contact@Supacare.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} aria-hidden="true" /> 0720096680
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" /> Nairobi, Kenya
            </li>
          </ul>

          <form
            onSubmit={handleSubmit}
            className="mt-6"
            aria-label="Newsletter Subscription Form"
          >
            <label htmlFor="newsletter-email" className="text-sm font-semibold">
              Subscribe to our newsletter
            </label>
            <div className="mt-2 flex">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-describedby="newsletter-desc"
                className="w-full px-3 py-2 rounded-l-md bg-white text-black placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-[#fcbf49]"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-[#fcbf49] text-[#1b4332] font-semibold px-4 py-2 rounded-r-md hover:bg-[#e0ac00] focus:outline-none focus:ring-2 focus:ring-[#fcbf49]"
              >
                Join
              </button>
            </div>
            <p id="newsletter-desc" className="text-xs text-gray-400 mt-1">
              We’ll send you monthly updates. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>

      {/* ✅ Footer Bottom */}
      <div className="mt-12 pt-6 border-t border-[#2f5c48] flex flex-col sm:flex-row items-center justify-between text-[15px] text-gray-300">
        <p>© 2022 Supacare. All rights reserved.</p>

        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <label htmlFor="language" className="text-sm font-medium">
            🌍 Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#fcbf49]"
            aria-label="Select site language"
          >
            <option value="English">English</option>
            <option value="Swahili">Swahili</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
    </footer>
  )
}
