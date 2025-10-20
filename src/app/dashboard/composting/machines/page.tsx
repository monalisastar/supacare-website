'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDollarSign, FaTimes, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface Machine {
  id: string
  name: string
  capacity: string
  price: string
  description: string
}

interface Inquiry {
  id: string
  machineId: string
  machineName: string
  name: string
  email: string
  message: string
  createdAt: string
}

interface MachinesPageProps {
  role: 'admin' | 'client'
}

// -------------------------
// Reusable Components
// -------------------------

const MachineCard = ({
  machine,
  onInquire,
  role,
  onEdit,
  onDelete,
}: {
  machine: Machine
  onInquire?: (m: Machine) => void
  role: 'client' | 'admin'
  onEdit?: (m: Machine) => void
  onDelete?: (id: string) => void
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col"
  >
    <h2 className="text-lg font-semibold text-lime-700">{machine.name}</h2>
    <p className="text-sm text-gray-500">Capacity: {machine.capacity}</p>
    <p className="text-sm text-gray-500 mb-2">Price: {machine.price}</p>
    <p className="text-sm text-gray-600 flex-1">{machine.description}</p>

    {role === 'client' && onInquire && (
      <button
        onClick={() => onInquire(machine)}
        className="mt-4 px-4 py-2 bg-lime-600 text-white rounded-xl flex items-center gap-2 hover:bg-lime-700"
      >
        <FaDollarSign /> Inquire
      </button>
    )}

    {role === 'admin' && (
      <div className="mt-4 flex gap-2">
        <button onClick={() => onEdit?.(machine)} className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <button onClick={() => onDelete?.(machine.id)} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    )}
  </motion.div>
)

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <AnimatePresence>
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
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
)

// -------------------------
// Main Page Component
// -------------------------

export default function MachinesPage({ role }: MachinesPageProps) {
  const router = useRouter()
  const [machines, setMachines] = useState<Machine[]>([])
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [editForm, setEditForm] = useState({ name: '', capacity: '', price: '', description: '' })

  // Fetch data
  useEffect(() => {
    fetchMachines()
    if (role === 'admin') fetchInquiries()
  }, [role])

  const fetchMachines = async () => {
    try {
      const res = await fetch('/api/composting/machines')
      const data = await res.json()
      setMachines(data)
    } catch (err) {
      console.error('Error fetching machines:', err)
    }
  }

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/composting/machines/inquiries')
      const data = await res.json()
      setInquiries(data)
    } catch (err) {
      console.error('Error fetching inquiries:', err)
    }
  }

  // -------------------------
  // Form Handlers
  // -------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMachine) return
    setLoading(true)
    try {
      const res = await fetch('/api/composting/machines/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ machineId: selectedMachine.id, ...form }),
      })
      if (!res.ok) throw new Error('Failed to send inquiry')
      alert('Inquiry sent successfully!')
      setForm({ name: '', email: '', message: '' })
      setSelectedMachine(null)
    } catch (err) {
      console.error(err)
      alert('Failed to send inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // Admin Handlers
  // -------------------------
  const handleDeleteMachine = async (id: string) => {
    if (!confirm('Are you sure you want to delete this machine?')) return
    try {
      const res = await fetch(`/api/composting/machines/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete machine')
      setMachines(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete machine.')
    }
  }

  const handleEditMachine = (machine: Machine) => {
    setEditingMachine(machine)
    setEditForm({
      name: machine.name,
      capacity: machine.capacity,
      price: machine.price,
      description: machine.description,
    })
  }

  const handleSaveEdit = async () => {
    if (!editingMachine) return
    try {
      const res = await fetch(`/api/composting/machines/${editingMachine.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error('Failed to update machine')
      setMachines(prev => prev.map(m => (m.id === editingMachine.id ? { ...m, ...editForm } : m)))
      setEditingMachine(null)
    } catch (err) {
      console.error(err)
      alert('Failed to update machine.')
    }
  }

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      const res = await fetch(`/api/composting/machines/inquiries/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete inquiry')
      setInquiries(prev => prev.filter(i => i.id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete inquiry.')
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lime-700">Composting Machines</h1>
        <button
          onClick={() => router.push('/dashboard/composting/overview')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft /> Return to Overview
        </button>
      </div>

      {/* Client View */}
      {role === 'client' && (
        <>
          <p className="text-gray-600 mb-4">
            Browse composting machines available for purchase. Click “Inquire” to request more details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {machines.length > 0 ? (
              machines.map(machine => (
                <MachineCard
                  key={machine.id}
                  machine={machine}
                  role="client"
                  onInquire={setSelectedMachine}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-3">No machines available at the moment.</p>
            )}
          </div>

          {selectedMachine && (
            <Modal onClose={() => setSelectedMachine(null)}>
              <h2 className="text-xl font-bold text-lime-700 mb-2">
                Inquiry: {selectedMachine.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Capacity: {selectedMachine.capacity} | Price: {selectedMachine.price}
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className="w-full px-3 py-2 border rounded-lg h-24"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </Modal>
          )}
        </>
      )}

      {/* Admin View */}
      {role === 'admin' && (
        <>
          <h2 className="text-xl font-bold mt-4 mb-2">All Machines</h2>
          {machines.length > 0 ? (
            <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Capacity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {machines.map(m => (
                  <tr key={m.id} className="border-t border-gray-200">
                    <td className="px-4 py-2">{m.name}</td>
                    <td className="px-4 py-2">{m.capacity}</td>
                    <td className="px-4 py-2">{m.price}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button onClick={() => handleEditMachine(m)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteMachine(m.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No machines available.</p>
          )}

          {/* Edit Modal */}
          {editingMachine && (
            <Modal onClose={() => setEditingMachine(null)}>
              <h2 className="text-xl font-bold text-lime-700 mb-2">Edit Machine</h2>
              <form
                className="space-y-4"
                onSubmit={e => {
                  e.preventDefault()
                  handleSaveEdit()
                }}
              >
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="capacity"
                  value={editForm.capacity}
                  onChange={handleEditChange}
                  placeholder="Capacity"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  required
                  className="w-full px-3 py-2 border rounded-lg h-24"
                />
                <button type="submit" className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700">
                  Save Changes
                </button>
              </form>
            </Modal>
          )}

          <h2 className="text-xl font-bold mt-8 mb-2">Machine Inquiries</h2>
          {inquiries.length > 0 ? (
            <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Machine</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(i => (
                  <tr key={i.id} className="border-t border-gray-200">
                    <td className="px-4 py-2">{i.machineName}</td>
                    <td className="px-4 py-2">{i.name}</td>
                    <td className="px-4 py-2">{i.email}</td>
                    <td className="px-4 py-2">{i.message}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleDeleteInquiry(i.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No inquiries yet.</p>
          )}
        </>
      )}
    </div>
  )
}
