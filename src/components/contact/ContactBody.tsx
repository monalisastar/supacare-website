'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

const reasons = [
  'Carbon credit enquiry',
  'Partnership / waste collection',
  'Media or press',
  'General question',
  'Other',
]

export default function ContactBody() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:bg-white transition-colors"

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-16">

        {/* Form — takes 3 cols */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Send us a message</h2>

          {status === 'sent' ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-900 font-semibold text-lg mb-2">Message sent</p>
              <p className="text-gray-500 text-sm">We'll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">What's this about?</label>
                <select
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>Select a reason</option>
                  {reasons.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="self-start px-8 py-3.5 bg-green-700 hover:bg-green-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>

        {/* Info — takes 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact details</h2>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-0.5">Email</p>
                  <a href="mailto:contact@supacare.com" className="text-gray-800 text-sm hover:text-green-700 transition-colors">
                    contact@supacare.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-0.5">Phone</p>
                  <a href="tel:+254720096680" className="text-gray-800 text-sm hover:text-green-700 transition-colors">
                    +254 720 096 680
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-0.5">Location</p>
                  <p className="text-gray-800 text-sm">Nairobi, Kenya</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-4">Follow us</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin,  href: 'https://www.linkedin.com/company/supacaresolutions/', label: 'LinkedIn'  },
                { icon: Twitter,   href: 'https://twitter.com/supacareltd',                    label: 'Twitter'   },
                { icon: Facebook,  href: 'https://www.facebook.com/supacaresolutions',         label: 'Facebook'  },
                { icon: Instagram, href: 'https://www.instagram.com/supacaresolutions',        label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-green-100 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-600 hover:text-green-700" />
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#061209]">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">Response time</p>
            <p className="text-white font-medium mb-1">1–2 business days</p>
            <p className="text-white/50 text-sm leading-relaxed">
              For urgent enquiries about carbon credits or active partnerships, mention it in your message.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
