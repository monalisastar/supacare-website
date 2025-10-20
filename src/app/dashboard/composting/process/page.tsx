'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaTrashAlt, 
  FaLeaf, 
  FaCog, 
  FaHourglassHalf, 
  FaCheckCircle, 
  FaEdit, 
  FaPlus, 
  FaSave 
} from 'react-icons/fa'

interface ProcessStep {
  id: string
  title: string
  description: string
}

interface Batch {
  id: string
  stage: string
  status: number // 0-100%
}

interface CompostingProcessPageProps {
  role: 'admin' | 'client'
}

const stepIcons: Record<string, JSX.Element> = {
  Collection: <FaTrashAlt />,
  Sorting: <FaCog />,
  Processing: <FaLeaf />,
  Curing: <FaHourglassHalf />,
  'Final Product': <FaCheckCircle />,
}

export default function CompostingProcessPage({ role }: CompostingProcessPageProps) {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null)
  const [newStep, setNewStep] = useState<Pick<ProcessStep, 'title' | 'description'>>({ title: '', description: '' })
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/composting/processes')
        const data = await res.json()

        // Ensure arrays
        setSteps(Array.isArray(data.steps) ? data.steps : [])
        setBatches(Array.isArray(data.batches) ? data.batches : [])
      } catch (err) {
        console.error('Error fetching composting process data:', err)
        setSteps([])
        setBatches([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // --- Admin Step Actions ---
  const handleSaveStep = async () => {
    if (!editingStep) return
    try {
      const res = await fetch(`/api/composting/processes/${editingStep.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStep),
      })
      if (!res.ok) throw new Error('Failed to update step')
      setSteps(steps.map(s => (s.id === editingStep.id ? editingStep : s)))
      setEditingStep(null)
    } catch (err) {
      console.error(err)
      alert('Failed to update step')
    }
  }

  const handleAddStep = async () => {
    try {
      const res = await fetch(`/api/composting/processes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStep),
      })
      if (!res.ok) throw new Error('Failed to add step')
      const created = await res.json()
      setSteps([...steps, created])
      setNewStep({ title: '', description: '' })
      setEditingStep(null)
    } catch (err) {
      console.error(err)
      alert('Failed to add step')
    }
  }

  // --- Admin Batch Actions ---
  const handleSaveBatch = async () => {
    if (!editingBatch) return
    try {
      const res = await fetch(`/api/composting/processes/${editingBatch.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBatch),
      })
      if (!res.ok) throw new Error('Failed to update batch')
      setBatches(batches.map(b => (b.id === editingBatch.id ? editingBatch : b)))
      setEditingBatch(null)
    } catch (err) {
      console.error(err)
      alert('Failed to update batch')
    }
  }

  if (loading) return <p className="p-6 text-gray-600">Loading composting process...</p>

  return (
    <div className="p-6 space-y-10">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-bold text-lime-700">Composting Process</h1>
        <p className="text-gray-600 mt-2">
          Track how your organic waste is transformed into nutrient-rich compost.
        </p>
      </header>

      {/* Process Steps */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Process Steps</h2>
          {role === 'admin' && (
            <button
              onClick={() => setEditingStep({ id: '', title: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-lime-600 text-white rounded-xl hover:bg-lime-700"
            >
              <FaPlus /> Add Step
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {Array.isArray(steps) && steps.map(step => (
            <motion.div
              key={step.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 text-center relative"
            >
              <div className="text-3xl text-lime-600 mb-3 flex justify-center">
                {stepIcons[step.title] || <FaLeaf />}
              </div>
              <h3 className="font-bold text-lime-700">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
              {role === 'admin' && (
                <button
                  onClick={() => setEditingStep(step)}
                  className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Batch Progress */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Batches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(batches) && batches.map(batch => (
            <motion.div 
              key={batch.id} 
              whileHover={{ scale: 1.03 }}
              className="p-5 bg-lime-50 rounded-2xl border border-lime-200 shadow-sm relative"
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

              {role === 'admin' && (
                <button
                  onClick={() => setEditingBatch(batch)}
                  className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Admin Edit/Add Step Modal */}
      <AnimatePresence>
        {editingStep && role === 'admin' && (
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
                onClick={() => setEditingStep(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTrashAlt />
              </button>

              <h2 className="text-xl font-bold text-lime-700 mb-4">
                {editingStep.id ? 'Edit Step' : 'Add Step'}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={editingStep.title || newStep.title}
                  onChange={e =>
                    editingStep.id
                      ? setEditingStep({ ...editingStep, title: e.target.value })
                      : setNewStep({ ...newStep, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={editingStep.description || newStep.description}
                  onChange={e =>
                    editingStep.id
                      ? setEditingStep({ ...editingStep, description: e.target.value })
                      : setNewStep({ ...newStep, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg h-24"
                />
                <button
                  onClick={() => (editingStep.id ? handleSaveStep() : handleAddStep())}
                  className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 flex items-center justify-center gap-2"
                >
                  <FaSave /> {editingStep.id ? 'Save Changes' : 'Add Step'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Edit Batch Modal */}
      <AnimatePresence>
        {editingBatch && role === 'admin' && (
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
                onClick={() => setEditingBatch(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaTrashAlt />
              </button>

              <h2 className="text-xl font-bold text-lime-700 mb-4">Edit Batch</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Stage"
                  value={editingBatch.stage}
                  onChange={e => setEditingBatch({ ...editingBatch, stage: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Progress %"
                  value={editingBatch.status}
                  onChange={e => setEditingBatch({ ...editingBatch, status: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                  min={0}
                  max={100}
                />
                <button
                  onClick={handleSaveBatch}
                  className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 flex items-center justify-center gap-2"
                >
                  <FaSave /> Save Batch
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
