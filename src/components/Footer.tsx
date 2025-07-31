'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail, Phone, MapPin, Facebook, Linkedin, Instagram,
  Home, Wrench, PhoneCall, MessageCircle
} from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('English')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email subscribed:', email)
    setEmail('')
  }

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-[#1b4332] text-[#f5f5f0] px-6 sm:px-12 pt-16 pb-24 sm:pb-16 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Supacare</h2>
            <p className="text-sm text-gray-300">
              Sustainable solutions for a cleaner, greener tomorrow.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/waste-collection" className="hover:text-[#fcbf49]">Waste Collection & Disposal</Link></li>
              <li><Link href="/services/carbon-advisory" className="hover:text-[#fcbf49]">Carbon Advisory</Link></li>
              <li><Link href="/services/recycling-composting" className="hover:text-[#fcbf49]">Recycling & Composting</Link></li>
              <li><Link href="/services/smart-waste" className="hover:text-[#fcbf49]">Smart Waste Tracking</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us" className="hover:text-[#fcbf49]">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#fcbf49]">Careers</Link></li>
              <li><Link href="/projects" className="hover:text-[#fcbf49]">Projects</Link></li>
              <li><Link href="/faq" className="hover:text-[#fcbf49]">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><Mail size={16} /> contact@Supacare.org</li>
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

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-[#2f5c48] flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2025 Supacare. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#fcbf49]"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-[#fcbf49]"><Instagram size={18} /></a>
            <a href="#" className="hover:text-[#fcbf49]"><Facebook size={18} /></a>
          </div>
        </div>

        {/* Language Selector */}
        <div className="absolute bottom-4 right-6 text-sm text-gray-400">
          🌍 Language:{' '}
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
      </footer>

      {/* Sticky Footer Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1b4332] text-white sm:hidden flex justify-around items-center h-14 border-t border-[#2f5c48]">
        <Link href="/" className="flex flex-col items-center text-xs hover:text-[#fcbf49]">
          <Home size={18} />
          Home
        </Link>
        <Link href="/services" className="flex flex-col items-center text-xs hover:text-[#fcbf49]">
          <Wrench size={18} />
          Services
        </Link>
        <Link href="/contact" className="flex flex-col items-center text-xs hover:text-[#fcbf49]">
          <PhoneCall size={18} />
          Contact
        </Link>
        <a
          href="https://wa.me/254720096680"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-xs hover:text-[#fcbf49]"
        >
          <MessageCircle size={18} />
          Chat
        </a>
      </div>
    </>
  )
}

