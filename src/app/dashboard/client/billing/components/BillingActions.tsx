'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Loader2 } from 'lucide-react'

export default function BillingActions() {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<'MPESA' | 'CARD' | 'CRYPTO'>('MPESA')
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES')
  const [message, setMessage] = useState<string | null>(null)

  async function handleNewPayment() {
    if (!amount) {
      setMessage('Please enter a valid amount.')
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          method,
          currency,
          serviceType: 'Waste Pickup Subscription',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Something went wrong.')
        return
      }

      setMessage(`✅ Payment initialized successfully (${data.currency} ${data.amount})`)
    } catch (err) {
      console.error(err)
      setMessage('⚠️ Failed to initiate payment.')
    } finally {
      setLoading(false)
      setAmount('')
    }
  }

  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-end justify-between bg-white/70 p-4 rounded-xl border border-green-100 shadow-sm">
      {/* Left: Amount + Options */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-1 w-full md:w-40 border border-green-200 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'KES' | 'USD')}
            className="mt-1 w-full md:w-32 border border-green-200 rounded-lg px-2 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as 'MPESA' | 'CARD' | 'CRYPTO')}
            className="mt-1 w-full md:w-36 border border-green-200 rounded-lg px-2 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="MPESA">MPesa</option>
            <option value="CARD">Card</option>
            <option value="CRYPTO">Crypto</option>
          </select>
        </div>
      </div>

      {/* Right: Button */}
      <div className="flex justify-end mt-2 md:mt-0">
        <Button
          onClick={handleNewPayment}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : (
            <>
              <Plus size={16} />
              Make Payment
            </>
          )}
        </Button>
      </div>

      {/* Status message */}
      {message && (
        <p
          className={`text-sm mt-2 ${
            message.startsWith('✅') ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </section>
  )
}
