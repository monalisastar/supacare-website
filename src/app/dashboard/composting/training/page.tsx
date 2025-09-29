'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChalkboardTeacher, FaClock, FaCheckCircle, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const trainingPrograms = [
  { id: 1, title: 'Composting Basics', level: 'Beginner', duration: '2 hours', nextDate: '2025-10-05' },
  { id: 2, title: 'Advanced Composting Techniques', level: 'Intermediate', duration: '4 hours', nextDate: '2025-10-12' },
  { id: 3, title: 'Safety & Machine Handling', level: 'All Levels', duration: '3 hours', nextDate: '2025-10-15' },
]

const enrollments = [
  { id: 1, title: 'Composting Basics', progress: 100, status: 'Completed' },
  { id: 2, title: 'Safety & Machine Handling', progress: 60, status: 'In Progress' },
]

export default function TrainingPage() {
  const [selectedTraining, setSelectedTraining] = useState<any>(null)
  const router = useRouter()

  return (
    <div className="p-6 space-y-10">
      {/* Header with Return Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lime-700">Training Programs</h1>
        <button
          onClick={() => router.push('/dashboard/composting/overview')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft /> Return to Overview
        </button>
      </div>

      <p className="text-gray-600">Learn composting techniques, machine safety, and advanced practices.</p>

      {/* Available Programs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainingPrograms.map((program) => (
            <motion.div
              key={program.id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-lime-700">{program.title}</h3>
                <p className="text-sm text-gray-500">Level: {program.level}</p>
                <p className="text-sm text-gray-500">Duration: {program.duration}</p>
                <p className="text-sm text-gray-600 mt-2">Next Session: {program.nextDate}</p>
              </div>
              <button
                onClick={() => setSelectedTraining(program)}
                className="mt-4 px-4 py-2 bg-lime-600 text-white rounded-xl flex items-center gap-2 hover:bg-lime-700"
              >
                <FaChalkboardTeacher /> Request Training
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Your Enrollments */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Enrollments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="p-5 bg-lime-50 rounded-2xl border border-lime-200 shadow-sm">
              <h3 className="font-bold text-lime-700">{enrollment.title}</h3>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-lime-600 h-2 rounded-full"
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
      </section>

      {/* Inquiry Modal */}
      <AnimatePresence>
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
              {/* Close button */}
              <button
                onClick={() => setSelectedTraining(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold text-lime-700 mb-4">
                Request Enrollment: {selectedTraining.title}
              </h2>
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
                    placeholder={`Ask about ${selectedTraining.title}...`}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-lime-600 text-white rounded-xl hover:bg-lime-700"
                >
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
