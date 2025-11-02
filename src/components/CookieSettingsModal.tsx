'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CookieSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  // Load stored preferences
  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent')
    if (stored) setPreferences(JSON.parse(stored))
  }, [open])

  // Save updates
  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    onClose()
  }

  const resetPreferences = () => {
    localStorage.removeItem('cookieConsent')
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 w-[90%] max-w-lg shadow-2xl text-gray-800 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close cookie settings"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Manage Cookie Preferences</h2>
            <p className="text-gray-600 mb-6">
              Adjust your cookie choices below. Some cookies are essential for basic site functionality.
            </p>

            {/* Category Toggles */}
            {Object.keys(preferences).map((key) =>
              key === 'essential' ? (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Essential</span>
                  <span className="text-sm text-gray-500">Always Active</span>
                </div>
              ) : (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <label htmlFor={key} className="capitalize font-medium text-gray-700">
                    {key}
                  </label>
                  <input
                    id={key}
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

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
              <button
                onClick={resetPreferences}
                className="text-sm text-gray-500 underline hover:text-gray-700"
              >
                Reset Preferences
              </button>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={savePreferences}
                  className="px-6 py-2 bg-[#1b4332] text-white rounded-lg hover:bg-[#145a3f]"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
