'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle, Send } from 'lucide-react'
import Image from 'next/image'

const QUICK_MESSAGES = [
  "I'd like to partner with Supacare",
  "Tell me about carbon credits",
  "I need waste collection services",
  "I want to learn more about your project",
]

const WA_NUMBER = '254720096680'

function buildWaLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function FloatingWhatsAppButton() {
  const [mounted, setMounted]   = useState(false)
  const [open, setOpen]         = useState(false)
  const [custom, setCustom]     = useState('')
  const [visible, setVisible]   = useState(false)
  const [showPulse, setShowPulse] = useState(true)

  // Only render on client to avoid hydration mismatch
  useEffect(() => { setMounted(true) }, [])

  // Fade in after mount
  useEffect(() => {
    if (!mounted) return
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [mounted])

  // Stop pulse after first open
  useEffect(() => {
    if (open) setShowPulse(false)
  }, [open])

  if (!mounted) return null

  function handleQuick(msg: string) {
    window.open(buildWaLink(msg), '_blank', 'noopener,noreferrer')
  }

  function handleCustom() {
    const msg = custom.trim() || 'Hello Supacare! I would like to learn more.'
    window.open(buildWaLink(msg), '_blank', 'noopener,noreferrer')
    setCustom('')
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Chat popup */}
      {open && (
        <div className="w-80 rounded-2xl shadow-2xl overflow-hidden border border-white/10 animate-slide-up">

          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 bg-green-800 flex items-center justify-center">
                <Image
                  src="/images/supalogo.webp"
                  alt="Supacare"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Supacare Solutions</p>
                <span className="flex items-center gap-1 text-xs text-green-300">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Typically replies in minutes
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat body */}
          <div className="bg-[#ECE5DD] px-4 py-4 space-y-3">

            {/* Greeting bubble */}
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-green-800">
                <Image src="/images/supalogo.webp" alt="" width={28} height={28} className="object-cover" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-sm max-w-[220px]">
                <p className="text-gray-800 text-sm leading-snug">
                  Hi there! 👋 How can we help you today?
                </p>
                <p className="text-gray-400 text-[10px] mt-1 text-right">just now</p>
              </div>
            </div>

            {/* Quick replies */}
            <div className="pl-9 space-y-1.5">
              {QUICK_MESSAGES.map((msg) => (
                <button
                  key={msg}
                  onClick={() => handleQuick(msg)}
                  className="block w-full text-left text-xs bg-white hover:bg-green-50 text-[#075E54] font-medium border border-[#075E54]/20 rounded-xl px-3 py-2 transition-colors shadow-sm"
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>

          {/* Custom message input */}
          <div className="bg-[#F0F0F0] px-3 py-2.5 flex items-center gap-2 border-t border-gray-200">
            <input
              type="text"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCustom()}
              placeholder="Type a message…"
              className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none border border-gray-200"
            />
            <button
              onClick={handleCustom}
              className="w-9 h-9 bg-[#075E54] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#064e46] transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        {showPulse && !open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        )}
        {open
          ? <X className="w-6 h-6" />
          : <MessageCircle className="w-6 h-6 fill-white" />
        }
      </button>
    </div>
  )
}
