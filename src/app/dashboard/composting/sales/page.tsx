'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLeaf, FaShoppingCart, FaTimes, FaHistory, FaArrowLeft, FaTrash, FaEdit, FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface CompostBatch {
  id: string
  type: string
  quality: string
  quantity: string
  price: string
}

interface Inquiry {
  id: string
  batchId: string
  batchType: string
  name: string
  email: string
  message: string
  createdAt: string
}

interface Purchase {
  id: string
  batchType: string
  date: string
  quantity: string
  status: string
}

interface CompostSalesPageProps {
  role: 'admin' | 'client'
}

export default function CompostSalesPage({ role }: CompostSalesPageProps) {
  const router = useRouter()

  // State
  const [batches, setBatches] = useState<CompostBatch[]>([])
  const [selectedBatch, setSelectedBatch] = useState<CompostBatch | null>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([])
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [editingBatch, setEditingBatch] = useState<CompostBatch | null>(null)
  const [newBatch, setNewBatch] = useState({ type: '', quality: '', quantity: '', price: '' })

  // Fetch batches and inquiries
  useEffect(() => {
    fetch('/api/composting/sales')
      .then(res => res.json())
      .then(data => setBatches(data))
      .catch(err => console.error('Error fetching batches:', err))

    if (role === 'admin') {
      fetch('/api/composting/sales/inquiries')
        .then(res => res.json())
        .then(data => setInquiries(data))
        .catch(err => console.error('Error fetching inquiries:', err))
    } else {
      // client purchase history
      fetch('/api/composting/sales/history')
        .then(res => res.json())
        .then(data => setPurchaseHistory(data))
        .catch(err => console.error('Error fetching history:', err))
    }
  }, [role])

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBatch) return
    setLoading(true)

    try {
      const res = await fetch('/api/composting/sales/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchId: selectedBatch.id, ...form }),
      })
      if (!res.ok) throw new Error('Failed to send inquiry')

      alert('Inquiry sent successfully!')
      setForm({ name: '', email: '', message: '' })
      setSelectedBatch(null)
    } catch (err) {
      console.error(err)
      alert('Failed to send inquiry')
    } finally {
      setLoading(false)
    }
  }

  // Admin actions
  const handleDeleteBatch = async (id: string) => {
    if (!confirm('Are you sure you want to delete this batch?')) return
    try {
      const res = await fetch(`/api/composting/sales/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setBatches(batches.filter(b => b.id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete batch')
    }
  }

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      const res = await fetch(`/api/composting/sales/inquiries/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setInquiries(inquiries.filter(i => i.id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete inquiry')
    }
  }

  const handleSaveBatch = async () => {
    if (!editingBatch) return
    try {
      const res = await fetch(`/api/composting/sales/${editingBatch.id}`, {
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

  const handleAddBatch = async () => {
    try {
      const res = await fetch(`/api/composting/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBatch),
      })
      if (!res.ok) throw new Error('Failed to add batch')
      const created = await res.json()
      setBatches([...batches, created])
      setNewBatch({ type: '', quality: '', quantity: '', price: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to add batch')
    }
  }

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lime-700">Compost Sales</h1>
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
          <section>
            <h2 className="text-2xl font-semibold mb-4">Compost for Sale</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {batches.map(batch => (
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
                  {purchaseHistory.map(p => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-3">{p.batchType}</td>
                      <td className="px-4 py-3">{p.date}</td>
                      <td className="px-4 py-3">{p.quantity}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.status === 'Delivered'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Admin View */}
      {role === 'admin' && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4">All Compost Batches</h2>
            <button
              onClick={() => setEditingBatch({ id: '', type: '', quality: '', quantity: '', price: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-lime-600 text-white rounded-xl hover:bg-lime-700"
            >
              <FaPlus /> Add New Batch
            </button>
          </div>

          <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden mb-8">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Quality</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map(batch => (
                <tr key={batch.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{batch.type}</td>
                  <td className="px-4 py-2">{batch.quality}</td>
                  <td className="px-4 py-2">{batch.quantity}</td>
                  <td className="px-4 py-2">{batch.price}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => setEditingBatch(batch)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteBatch(batch.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Inquiries */}
          <h2 className="text-2xl font-semibold mb-4">All Inquiries</h2>
          <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Batch</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(i => (
                <tr key={i.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{i.batchType}</td>
                  <td className="px-4 py-2">{i.name}</td>
                  <td className="px-4 py-2">{i.email}</td>
                  <td className="px-4 py-2">{i.message}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteInquiry(i.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Client Inquiry Modal */}
      <AnimatePresence>
        {selectedBatch && role === 'client' && (
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

              <h2 className="text-xl font-bold text-lime-700 mb-4">Inquiry: {selectedBatch.type}</h2>
              <p className="text-sm text-gray-600 mb-4">Available: {selectedBatch.quantity}</p>

              <form className="space-y-4" onSubmit={handleSubmitInquiry}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  name="message"
                  placeholder={`Ask about ${selectedBatch.type}...`}
                  value={form.message}
                  onChange={handleChange}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Edit/Add Modal */}
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
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold text-lime-700 mb-4">
                {editingBatch.id ? 'Edit Batch' : 'Add New Batch'}
              </h2>

              <div className="space-y-4">
                {['type', 'quality', 'quantity', 'price'].map(field => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={(editingBatch as any)[field] || (newBatch as any)[field]}
                    onChange={e =>
                      editingBatch
                        ? setEditingBatch({ ...editingBatch, [field]: e.target.value })
                        : setNewBatch({ ...newBatch, [field]: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                ))}
                <button
                  onClick={() => (editingBatch?.id ? handleSaveBatch() : handleAddBatch())}
                  className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700"
                >
                  {editingBatch?.id ? 'Save Changes' : 'Add Batch'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
