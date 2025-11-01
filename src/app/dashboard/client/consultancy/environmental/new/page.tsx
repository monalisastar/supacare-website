'use client'

import React, { useState } from 'react'
import ConsultancyTypeSelector from './components/ConsultancyTypeSelector'
import ConsultancyDetailsForm from './components/ConsultancyDetailsForm'
import ConsultancySummary from './components/ConsultancySummary'
import { ClipboardList } from 'lucide-react'
import { ConsultancyCategory } from '@prisma/client'

/**
 * 🌿 NewConsultancyPage
 * ---------------------------------------------------------
 * Step-based client flow for creating a new consultancy request.
 * Connects directly to /api/client/consultancy (server route).
 */
export default function NewConsultancyPage() {
  // 🧭 Step tracker (1 = select type, 2 = details, 3 = review)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // 🧾 Form state
  const [formData, setFormData] = useState({
    type: '',
    company: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    designation: '',
    description: '',
    documents: [] as File[],
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  /**
   * ✅ handleSubmit
   * ---------------------------------------------------------
   * Sends consultancy request data to /api/client/consultancy.
   */
  const handleSubmit = async () => {
    try {
      setLoading(true)
      setMessage(null)

      // 🧮 Map consultancy type → Prisma Enum
      const category =
        formData.type.toLowerCase() === 'environmental'
          ? ConsultancyCategory.ENVIRONMENTAL
          : ConsultancyCategory.CARBON

      // 🧾 Construct payload
      const payload = {
        title: `${formData.type} Consultancy for ${
          formData.company || formData.contactName
        }`,
        description: formData.description,
        category,
        budgetEstimate: null,
        metadata: {
          company: formData.company,
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          designation: formData.designation,
        },
      }

      // 🚀 Submit to backend
      const res = await fetch('/api/client/consultancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to create consultancy request.')

      // 🟢 Success feedback
      setMessage('✅ Your consultancy request has been submitted successfully!')

      // ♻️ Reset form + restart flow
      setStep(1)
      setFormData({
        type: '',
        company: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        designation: '',
        description: '',
        documents: [],
      })
    } catch (error: any) {
      console.error('❌ Submission Error:', error)
      setMessage(error.message || 'Failed to submit request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* 🏷️ Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <ClipboardList size={22} className="text-green-600" />
          New Consultancy Request
        </h1>
        <p className="text-gray-600 text-sm">
          Step {step} of 3 —{' '}
          {step === 1
            ? 'Select Consultancy Type'
            : step === 2
            ? 'Enter Consultancy Details'
            : 'Review & Submit'}
        </p>
      </div>

      {/* 🧩 Step 1 — Type Selection */}
      {step === 1 && (
        <ConsultancyTypeSelector
          value={formData.type}
          onSelect={(type) => {
            setFormData({ ...formData, type })
            nextStep()
          }}
        />
      )}

      {/* 🧩 Step 2 — Details */}
      {step === 2 && (
        <ConsultancyDetailsForm
          data={formData}
          onChange={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {/* 🧩 Step 3 — Summary */}
      {step === 3 && (
        <ConsultancySummary
          data={formData}
          onSubmit={handleSubmit}
          onBack={prevStep}
          loading={loading}
        />
      )}

      {/* 🧠 Feedback */}
      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.startsWith('✅')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}
