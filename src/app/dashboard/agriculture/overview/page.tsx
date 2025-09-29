// src/app/dashboard/compost-agriculture/overview/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart, FaTimes, FaChalkboardTeacher, FaClock, FaCheckCircle } from 'react-icons/fa'
import CompostAgricultureLayout from '../CompostAgricultureLayout'

// ✅ Mock data
const compostForSale = [
  { id: 1, type: 'Premium Organic Compost', quality: 'High', quantity: '500 kg', price: '$200' },
  { id: 2, type: 'Standard Compost', quality: 'Medium', quantity: '1000 kg', price: '$300' },
  { id: 3, type: 'Community Blend', quality: 'High', quantity: '200 kg', price: '$90' },
]

const purchaseHistory = [
  { id: 1, type: 'Premium Organic Compost', date: '2025-09-01', quantity: '200 kg', status: 'Delivered' },
  { id: 2, type: 'Standard Compost', date: '2025-08-15', quantity: '300 kg', status: 'In Transit' },
]

const trainingPrograms = [
  { id: 1, title: 'Composting Basics', level: 'Beginner', duration: '2 hours', nextDate: '2025-10-05' },
  { id: 2, title: 'Advanced Composting Techniques', level: 'Intermediate', duration: '4 hours', nextDate: '2025-10-12' },
  { id: 3, title: 'Safety & Machine Handling', level: 'All Levels', duration: '3 hours', nextDate: '2025-10-15' },
]

const enrollments = [
  { id: 1, title: 'Composting Basics', progress: 100, status: 'Completed' },
  { id: 2, title: 'Safety & Machine Handling', progress: 60, status: 'In Progress' },
]

export default function AgricultureOverviewPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'history' | 'training'>('products')
  const [selectedBatch, setSelectedBatch] = useState<any>(null)
  const [selectedTraining, setSelectedTraining] = useState<any>(null)

  // ✅ Compute summary stats
  const totalPurchases = purchaseHistory.length
  const pendingDeliveries = purchaseHistory.filter(p => p.status !== 'Delivered').length
  const upcomingTrainings = trainingPrograms.length
  const completedTrainings = enrollments.filter(e => e.status === 'Completed').length

  return (
    <CompostAgricultureLayout>
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-5 bg-green-50 rounded-2xl border border-green-200 shadow-sm flex flex-col items-center">
          <p className="text-sm text-gray-500">Total Purchases</p>
          <h2 className="text-2xl font-bold text-green-700">{totalPurchases}</h2>
        </div>
        <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-200 shadow-sm flex flex-col items-center">
          <p className="text-sm text-gray-500">Pending Deliveries</p>
          <h2 className="text-2xl font-bold text-yellow-700">{pendingDeliveries}</h2>
        </div>
        <div className="p-5 bg-green-50 rounded-2xl border border-green-200 shadow-sm flex flex-col items-center">
          <p className="text-sm text-gray-500">Upcoming Trainings</p>
          <h2 className="text-2xl font-bold text-green-700">{upcomingTrainings}</h2>
        </div>
        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200 shadow-sm flex flex-col items-center">
          <p className="text-sm text-gray-500">Completed Trainings</p>
          <h2 className="text-2xl font-bold text-blue-700">{completedTrainings}</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-green-200">
        <button
          className={`px-4 py-2 rounded-t-xl font-medium ${
            activeTab === 'products' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700'
          }`}
          onClick={() => setActiveTab('products')}
        >
          Available Products
        </button>
        <button
          className={`px-4 py-2 rounded-t-xl font-medium ${
            activeTab === 'history' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Purchase History
        </button>
        <button
          className={`px-4 py-2 rounded-t-xl font-medium ${
            activeTab === 'training' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700'
          }`}
          onClick={() => setActiveTab('training')}
        >
          Farmer Training
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compostForSale.map((batch) => (
            <motion.div
              key={batch.id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-green-700">{batch.type}</h3>
                <p className="text-sm text-gray-500 mb-2">Quality: {batch.quality}</p>
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
        </section>
      )}

      {/* Purchase History Tab */}
      {activeTab === 'history' && (
        <section className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
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
        </section>
      )}

      {/* Training Tab */}
      {activeTab === 'training' && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingPrograms.map((program) => (
              <motion.div
                key={program.id}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-green-700">{program.title}</h3>
                  <p className="text-sm text-gray-500">Level: {program.level}</p>
                  <p className="text-sm text-gray-500">Duration: {program.duration}</p>
                  <p className="text-sm text-gray-600 mt-2">Next Session: {program.nextDate}</p>
                </div>
                <button
                  onClick={() => setSelectedTraining(program)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 hover:bg-green-700"
                >
                  <FaChalkboardTeacher /> Request Training
                </button>
              </motion.div>
            ))}
          </div>

          {/* Enrollment Status */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Your Enrollments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="p-5 bg-green-50 rounded-2xl border border-green-200 shadow-sm">
                  <h3 className="font-bold text-green-700">{enrollment.title}</h3>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${enrollment.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {enrollment.status === 'Completed' ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <FaCheckCircle /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-yellow-600">
                        <FaClock /> In Progress ({enrollment.progress}%)
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modals */}
      <AnimatePresence>
        {/* Product Modal */}
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
              <h2 className="text-xl font-bold text-green-700 mb-4">Inquiry / Purchase: {selectedBatch.type}</h2>
              <p className="text-sm text-gray-600 mb-4">Available: {selectedBatch.quantity}</p>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                <textarea rows={3} placeholder={`Ask about ${selectedBatch.type}...`} className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">Send Inquiry / Purchase</button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Training Modal */}
        {selectedTraining && (
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
                onClick={() => setSelectedTraining(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold text-green-700 mb-4">Request Training: {selectedTraining.title}</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                <textarea rows={3} placeholder={`Ask about ${selectedTraining.title}...`} className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">Submit Request</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CompostAgricultureLayout>
  )
}
