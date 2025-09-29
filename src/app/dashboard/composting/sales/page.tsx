'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLeaf, FaShoppingCart, FaTimes, FaHistory, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const compostForSale = [
  { id: 1, type: 'Premium Organic Compost', quality: 'High', quantity: '500 kg', price: '$200' },
  { id: 2, type: 'Standard Compost', quality: 'Medium', quantity: '1000 kg', price: '$300' },
  { id: 3, type: 'Community Blend', quality: 'High', quantity: '200 kg', price: '$90' },
]

const purchaseHistory = [
  { id: 1, type: 'Premium Organic Compost', date: '2025-09-01', quantity: '200 kg', status: 'Delivered' },
  { id: 2, type: 'Standard Compost', date: '2025-08-15', quantity: '300 kg', status: 'In Transit' },
]

export default function CompostSalesPage() {
  const [selectedBatch, setSelectedBatch] = useState<any>(null)
  const router = useRouter()

  return (
    <div className="p-6 space-y-10">
      {/* Header with Return Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lime-700">Compost Sales</h1>
        <button
          onClick={() => router.push('/dashboard/composting/overview')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft /> Return to Overview
        </button>
      </div>

      {/* Compost Sales Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Compost for Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compostForSale.map((batch) => (
            <motion.div
              key={batch.id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-lime-700">{batch.type}</h3>
                <p className="text-sm text-gray-500 mb-2">Quality: {batch.quality}</p>
                <p className="text-sm text-gray-600">Available: {batch.quantity}</p>
                <p className="text-xl font-bold text-lime-700 mt-3">{batch.price}</p>
              </div>
              <button
                onClick={() => setSelectedBatch(batch)}
                className="mt-4 px-4 py-2 bg-lime-600 text-white rounded-xl flex items-center gap-2 hover:bg-lime-700"
              >
                <FaShoppingCart /> Inquire
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Purchase History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaHistory /> Purchase History
        </h2>
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

      {/* Inquiry Modal */}
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
              {/* Close button */}
              <button
                onClick={() => setSelectedBatch(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold text-lime-700 mb-4">Inquiry: {selectedBatch.type}</h2>
              <p className="text-sm text-gray-600 mb-4">Available: {selectedBatch.quantity}</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={3}
                    placeholder={`Ask about ${selectedBatch.type}...`}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-lime-600 text-white rounded-xl hover:bg-lime-700"
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
