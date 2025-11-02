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
    <>
      <footer className="bg-[#1b4332] text-[#f5f5f0] px-6 sm:px-12 pt-16 pb-24 sm:pb-16 relative">
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
            <p className="text-sm text-gray-300 mb-6">
              Sustainable solutions for a cleaner, greener tomorrow.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/supacaresolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcbf49]"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com/supacareltd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcbf49]"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.facebook.com/supacaresolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcbf49]"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/supacaresolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcbf49]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/254720096680"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcbf49]"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fcbf49]"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* ✅ Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/recycling-composting" className="hover:text-[#fcbf49]">
                  Recycling & Composting
                </Link>
              </li>
              <li>
                <Link href="/services/environmental-consultancy" className="hover:text-[#fcbf49]">
                  Environmental Consultancy
                </Link>
              </li>
              <li>
                <Link href="/services/waste-collection" className="hover:text-[#fcbf49]">
                  Waste Collection & Disposal
                </Link>
              </li>
              <li>
                <Link href="/services/smart-waste" className="hover:text-[#fcbf49]">
                  Smart Waste Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* ✅ Company */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us" className="hover:text-[#fcbf49]">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#fcbf49]">Careers</Link></li>
              <li><Link href="/projects" className="hover:text-[#fcbf49]">Projects</Link></li>
              <li><Link href="/faq" className="hover:text-[#fcbf49]">FAQ</Link></li>
            </ul>
          </div>

          {/* ✅ Contact + Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><Mail size={16} /> contact@Supacare.com</li>
              <li className="flex items-center gap-2"><Phone size={16} /> 0720096680</li>
              <li className="flex items-center gap-2"><MapPin size={16} /> Nairobi, Kenya</li>
            </ul>

            <form onSubmit={handleSubmit} className="mt-6">
              <label className="text-sm font-semibold">Subscribe to our newsletter</label>
              <div className="mt-2 flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 rounded-l-md bg-white text-black placeholder:text-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#fcbf49] text-[#1b4332] font-semibold px-4 py-2 rounded-r-md hover:bg-[#e0ac00]"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ✅ Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-[#2f5c48] flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2022 Supacare. All rights reserved.</p>
          <div className="text-sm flex items-center gap-2">
            🌍 Language:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white border border-gray-500 rounded px-2 py-1"
            >
              <option value="English">English</option>
              <option value="Swahili">Swahili</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
      </footer>
    </>
  )
}
