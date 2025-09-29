'use client'

import { motion } from 'framer-motion'
import { 
  FaTrashAlt, 
  FaLeaf, 
  FaCog, 
  FaHourglassHalf, 
  FaCheckCircle 
} from 'react-icons/fa'

// Composting process steps
const steps = [
  { id: 1, title: 'Collection', description: 'Organic waste is collected from your bins and transported to our facility.', icon: <FaTrashAlt /> },
  { id: 2, title: 'Sorting', description: 'Non-compostable materials are removed to ensure clean input.', icon: <FaCog /> },
  { id: 3, title: 'Processing', description: 'Waste is shredded and fed into composting machines for accelerated breakdown.', icon: <FaLeaf /> },
  { id: 4, title: 'Curing', description: 'Compost is left to mature, ensuring nutrient-rich final output.', icon: <FaHourglassHalf /> },
  { id: 5, title: 'Final Product', description: 'Ready-to-use compost packaged for agriculture and landscaping.', icon: <FaCheckCircle /> },
]

// Mock recent batch progress (could later fetch from API)
const batches = [
  { id: 'B-001', stage: 'Processing', status: 60 },
  { id: 'B-002', stage: 'Curing', status: 80 },
  { id: 'B-003', stage: 'Final Product', status: 100 },
]

export default function CompostingProcessPage() {
  return (
    <div className="p-6 space-y-10">
      {/* Page Title */}
      <header>
        <h1 className="text-3xl font-bold text-lime-700">Composting Process</h1>
        <p className="text-gray-600 mt-2">
          Track how your organic waste is transformed into nutrient-rich compost through our 5-step process.
        </p>
      </header>

      {/* Process Flow */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our 5-Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 text-center"
            >
              <div className="text-3xl text-lime-600 mb-3 flex justify-center">
                {step.icon}
              </div>
              <h3 className="font-bold text-lime-700">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Batch Tracking */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Batches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <motion.div 
              key={batch.id} 
              whileHover={{ scale: 1.03 }}
              className="p-5 bg-lime-50 rounded-2xl border border-lime-200 shadow-sm"
            >
              <h3 className="font-bold text-lime-700">Batch {batch.id}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Current Stage: <span className="font-medium text-gray-700">{batch.stage}</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-lime-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${batch.status}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{batch.status}% complete</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
