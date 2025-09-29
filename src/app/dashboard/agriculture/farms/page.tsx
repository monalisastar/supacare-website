// src/app/dashboard/agriculture/farms/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart, FaTimes, FaClock, FaCheckCircle, FaSeedling } from 'react-icons/fa'
import CompostAgricultureLayout from '../CompostAgricultureLayout'



// ✅ Mock data for individual farmers
const compostForSale = [
  { id: 1, type: 'Premium Organic Compost', quality: 'High', quantity: '50 kg', price: '$25' },
  { id: 2, type: 'Standard Compost', quality: 'Medium', quantity: '100 kg', price: '$40' },
  { id: 3, type: 'Community Blend', quality: 'High', quantity: '30 kg', price: '$18' },
]

const purchaseHistory = [
  { id: 1, type: 'Premium Organic Compost', date: '2025-09-12', quantity: '20 kg', status: 'Delivered' },
  { id: 2, type: 'Standard Compost', date: '2025-09-18', quantity: '50 kg', status: 'In Transit' },
]

export default function FarmsPage() {
  const [selectedBatch, setSelectedBatch] = useState<any>(null)

  return (
    <CompostAgricultureLayout>
      <h2 className="text-2xl font-semibold mb-6">Compost for Individual Farmers</h2>

      {/* Available Products */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Available Compost</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compostForSale.map((batch) => (
            <motion.div
              key={batch.id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-bold text-green-700">{batch.type}</h4>
                <p className="text-sm text-gray-500 mb-1">Quality: {batch.quality}</p>
                <p className="text-sm text-gray-600">Available: {batch.quantity}</p>
                <p className="text-xl font-bold text-green-700 mt-3">{batch.price}</p>
              </div>
              <button
                onClick={() => setSelectedBatch(batch)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 hover:bg-green-700"
              >
                <FaShoppingCart /> Inquire / Purchase
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Purchase History */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Your Purchase History</h3>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((purchase) => (
                <tr key={purchase.id} className="border-t">
                  <td className="px-4 py-3">{purchase.type}</td>
                  <td className="px-4 py-3">{purchase.date}</td>
                  <td className="px-4 py-3">{purchase.quantity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        purchase.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Inquiry / Purchase Modal */}
      <AnimatePresence>
        {selectedBatch && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setSelectedBatch(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold text-green-700 mb-4">
                Inquiry / Purchase: {selectedBatch.type}
              </h2>
              <p className="text-sm text-gray-600 mb-4">Available: {selectedBatch.quantity}</p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                <textarea
                  rows={3}
                  placeholder={`Ask about ${selectedBatch.type}...`}
                  className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                >
                  Send Inquiry / Purchase
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CompostAgricultureLayout>
  )
}
