'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaChalkboardTeacher,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaPlus,
} from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

interface TrainingProgram {
  id: number
  title: string
  level: string
  duration: string
  nextDate: string
}

interface Enrollment {
  id: number
  title: string
  progress: number
  status: 'Completed' | 'In Progress'
}

export default function TrainingPage() {
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [selectedTraining, setSelectedTraining] = useState<TrainingProgram | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  // Detect user session & role
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession()
        if (session?.user?.role === 'ADMIN') {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      } catch (err) {
        console.error('Failed to fetch session', err)
        setIsAdmin(false)
      }
    }
    fetchSession()
  }, [])

  // Fetch trainings & enrollments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainingsRes, enrollmentsRes] = await Promise.all([
          fetch('/api/composting/training'),
          fetch('/api/composting/training/enrollments'),
        ])
        if (!trainingsRes.ok) throw new Error('Failed to fetch training programs')
        if (!enrollmentsRes.ok) throw new Error('Failed to fetch enrollments')
        setTrainingPrograms(await trainingsRes.json())
        setEnrollments(await enrollmentsRes.json())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Client: request training
  const handleRequestTraining = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedTraining) return
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch(`/api/composting/training/${selectedTraining.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })
      if (!res.ok) throw new Error('Failed to submit request')
      alert('Training request submitted!')
      setSelectedTraining(null)
    } catch (err) {
      console.error(err)
      alert('Failed to submit training request')
    } finally {
      setSubmitting(false)
    }
  }

  // Admin: add/edit training
  const handleAdminSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedTraining) return
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const body = {
      title: formData.get('title'),
      level: formData.get('level'),
      duration: formData.get('duration'),
      nextDate: formData.get('nextDate'),
    }
    try {
      const method = selectedTraining.id ? 'PUT' : 'POST'
      const url = selectedTraining.id
        ? `/api/composting/training/${selectedTraining.id}`
        : '/api/composting/training'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to save training')
      alert('Training saved successfully!')
      setSelectedTraining(null)
      const updatedTrainings = await fetch('/api/composting/training').then(r => r.json())
      setTrainingPrograms(updatedTrainings)
    } catch (err) {
      console.error(err)
      alert('Failed to save training')
    } finally {
      setSubmitting(false)
    }
  }

  // Admin: delete training
  const handleDeleteTraining = async (id: number) => {
    if (!confirm('Are you sure you want to delete this training?')) return
    try {
      const res = await fetch(`/api/composting/training/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete training')
      setTrainingPrograms(prev => prev.filter(t => t.id !== id))
      alert('Training deleted!')
    } catch (err) {
      console.error(err)
      alert('Failed to delete training')
    }
  }

  if (loading) return <p className="p-6 text-gray-600">Loading trainings...</p>

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lime-700">Training Programs</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/dashboard/composting/overview')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <FaArrowLeft /> Return to Overview
          </button>
          {isAdmin && (
            <button
              onClick={() => setSelectedTraining({ id: 0, title: '', level: '', duration: '', nextDate: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
            >
              <FaPlus /> Add Training
            </button>
          )}
        </div>
      </div>

      {/* Trainings Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainingPrograms.map(program => (
            <motion.div
              key={program.id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between relative"
            >
              <div>
                <h3 className="text-lg font-bold text-lime-700">{program.title}</h3>
                <p className="text-sm text-gray-500">Level: {program.level}</p>
                <p className="text-sm text-gray-500">Duration: {program.duration}</p>
                <p className="text-sm text-gray-600 mt-2">Next Session: {program.nextDate}</p>
              </div>
              {isAdmin ? (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedTraining(program)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-lg flex items-center gap-1 hover:bg-yellow-500"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTraining(program.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg flex items-center gap-1 hover:bg-red-600"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedTraining(program)}
                  className="mt-4 px-4 py-2 bg-lime-600 text-white rounded-xl flex items-center gap-2 hover:bg-lime-700"
                >
                  <FaChalkboardTeacher /> Request Training
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enrollments (Client only) */}
      {!isAdmin && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Enrollments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map(enrollment => (
              <div key={enrollment.id} className="p-5 bg-lime-50 rounded-2xl border border-lime-200 shadow-sm">
                <h3 className="font-bold text-lime-700">{enrollment.title}</h3>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-lime-600 h-2 rounded-full" style={{ width: `${enrollment.progress}%` }} />
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
      )}

      {/* Request / Admin Modal */}
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
              <button
                onClick={() => setSelectedTraining(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold text-lime-700 mb-4">
                {isAdmin
                  ? selectedTraining.id
                    ? 'Edit Training'
                    : 'Add Training'
                  : `Request Enrollment: ${selectedTraining.title}`}
              </h2>

              <form
                className="space-y-4"
                onSubmit={isAdmin ? handleAdminSave : handleRequestTraining}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">{isAdmin ? 'Title' : 'Your Name'}</label>
                  <input
                    name={isAdmin ? 'title' : 'name'}
                    type="text"
                    defaultValue={isAdmin ? selectedTraining.title : ''}
                    required
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{isAdmin ? 'Level' : 'Email'}</label>
                  <input
                    name={isAdmin ? 'level' : 'email'}
                    type={isAdmin ? 'text' : 'email'}
                    defaultValue={isAdmin ? selectedTraining.level : ''}
                    required
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{isAdmin ? 'Duration' : 'Message'}</label>
                  {isAdmin ? (
                    <input
                      name="duration"
                      type="text"
                      defaultValue={selectedTraining.duration}
                      required
                      className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                    />
                  ) : (
                    <textarea
                      name="message"
                      rows={3}
                      placeholder={`Ask about ${selectedTraining.title}...`}
                      className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                    />
                  )}
                </div>
                {isAdmin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Next Session Date</label>
                    <input
                      name="nextDate"
                      type="date"
                      defaultValue={selectedTraining.nextDate}
                      required
                      className="mt-1 w-full p-2 border rounded-lg focus:ring-lime-500 focus:border-lime-500"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-2 bg-lime-600 text-white rounded-xl hover:bg-lime-700"
                >
                  {submitting ? 'Saving...' : isAdmin ? 'Save Training' : 'Submit Request'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
