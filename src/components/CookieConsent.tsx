'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  // 🧠 Load stored consent
  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent')
    if (!stored) {
      setShowBanner(true)
    } else {
      setPreferences(JSON.parse(stored))
    }
  }, [])

  // 🧁 Save consent choice
  const saveConsent = (updated: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(updated))
    setPreferences(updated)
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptAll = () => {
    const allOn = { essential: true, analytics: true, marketing: true, preferences: true }
    saveConsent(allOn)
  }

  const rejectAll = () => {
    const onlyEssential = { essential: true, analytics: false, marketing: false, preferences: false }
    saveConsent(onlyEssential)
  }

  return (
    <>
      {/* ⚙️ Cookie Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-[90%] max-w-lg text-gray-800 shadow-xl relative"
            >
              <button
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-4">Cookie Preferences</h2>
              <p className="text-gray-600 mb-6">
                We use cookies to improve your experience. You can customize your consent below.
              </p>

              {Object.keys(preferences).map((key) =>
                key === 'essential' ? (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Essential</span>
                    <span className="text-sm text-gray-500">Always Active</span>
                  </div>
                ) : (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200">
                    <label className="font-medium capitalize text-gray-700">{key}</label>
                    <input
                      type="checkbox"
                      checked={preferences[key as keyof typeof preferences]}
                      onChange={(e) =>
                        setPreferences({ ...preferences, [key]: e.target.checked })
                      }
                      className="w-5 h-5 accent-green-700 cursor-pointer"
                    />
                  </div>
                )
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-5 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveConsent(preferences)}
                  className="px-6 py-2 bg-[#1b4332] text-white rounded-lg hover:bg-[#145a3f]"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🍪 Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-6 w-[90%] max-w-2xl z-[9998]"
            role="dialog"
            aria-labelledby="cookie-consent-title"
          >
            <h2 id="cookie-consent-title" className="text-lg font-semibold text-gray-900">
              We value your privacy 🍃
            </h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Supacare uses cookies to enhance your browsing experience, serve personalized
              content, and analyze site traffic. You can manage your preferences or read our{' '}
              <a href="/cookie-policy" className="text-[#1b4332] font-medium underline">
                Cookie Policy
              </a>.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 justify-end">
              <button
                onClick={rejectAll}
                className="px-5 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-5 py-2 border border-[#1b4332] text-[#1b4332] rounded-lg hover:bg-[#1b4332]/10"
              >
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 bg-[#1b4332] text-white rounded-lg hover:bg-[#145a3f]"
              >
                Accept All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
