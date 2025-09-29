'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDollarSign, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

// ✅ Mock data for machines available for sale
const machinesForSale = [
  {
    id: 'S-001',
    name: 'EcoComposter 500',
    capacity: '500kg/day',
    price: '$4,500',
    description: 'Compact composting machine suitable for small businesses and communities.',
  },
  {
    id: 'S-002',
    name: 'BioCycle Pro',
    capacity: '1 ton/day',
    price: '$8,900',
    description: 'Industrial-grade composter designed for large-scale operations.',
  },
  {
    id: 'S-003',
    name: 'GreenLoop Mini',
    capacity: '200kg/day',
    price: '$2,800',
    description: 'Entry-level machine perfect for restaurants and schools.',
  },
]

export default function MachinesPage() {
  const [selectedMachine, setSelectedMachine] = useState<any | null>(null)
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      {/* Header with Return Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lime-700">Composting Machines for Sale</h1>
        <button
          onClick={() => router.push('/dashboard/composting/overview')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft /> Return to Overview
        </button>
      </div>

      <p className="text-gray-600">
        Browse composting machines available for purchase. Click “Inquire” to request more details.
      </p>

      {/* Machines for Sale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {machinesForSale.map((machine) => (
          <motion.div
            key={machine.id}
            whileHover={{ scale: 1.02 }}
            className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col"
          >
            <h2 className="text-lg font-semibold text-lime-700">{machine.name}</h2>
            <p className="text-sm text-gray-500">Capacity: {machine.capacity}</p>
            <p className="text-sm text-gray-500 mb-2">Price: {machine.price}</p>
            <p className="text-sm text-gray-600 flex-1">{machine.description}</p>
            <button
              onClick={() => setSelectedMachine(machine)}
              className="mt-4 px-4 py-2 bg-lime-600 text-white rounded-xl flex items-center gap-2 hover:bg-lime-700"
            >
              <FaDollarSign /> Inquire
            </button>
          </motion.div>
        ))}
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {selectedMachine && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
            >
              <button
                onClick={() => setSelectedMachine(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold text-lime-700 mb-2">
                Inquiry: {selectedMachine.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Capacity: {selectedMachine.capacity} | Price: {selectedMachine.price}
              </p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Your Message"
                  className="w-full px-3 py-2 border rounded-lg h-24"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700"
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
