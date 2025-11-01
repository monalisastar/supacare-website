'use client'

import React, { useState } from 'react'
import ProjectFormHeader from './components/ProjectFormHeader'
import ProjectTypeSelector from './components/ProjectTypeSelector'
import ProjectDetailsForm from './components/ProjectDetailsForm'
import ProjectScopeForm from './components/ProjectScopeForm'
import ProjectSummary from './components/ProjectSummary'
import { ConsultancyCategory } from '@prisma/client'

export default function NewCarbonProjectPage() {
  // 🧭 Step tracker (1 = Type, 2 = Details, 3 = Scope, 4 = Review)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // 🧾 Form state
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    location: '',
    beneficiaries: '',
    scope: '',
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  // ✅ Handle final submission
  const handleSubmit = async () => {
    try {
      setLoading(true)
      setMessage(null)

      const payload = {
        title: formData.name || `${formData.type} Carbon Consultancy`,
        description: formData.description,
        category: ConsultancyCategory.CARBON,
        budgetEstimate: null,
        metadata: {
          type: formData.type,
          location: formData.location,
          beneficiaries: formData.beneficiaries,
          scope: formData.scope,
        },
      }

      const res = await fetch('/api/client/consultancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create project')

      setMessage('✅ Carbon consultancy project submitted successfully!')
      setStep(1)
      setFormData({
        type: '',
        name: '',
        description: '',
        location: '',
        beneficiaries: '',
        scope: '',
      })
    } catch (err: any) {
      console.error('❌ Submission Error:', err)
      setMessage(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <ProjectFormHeader step={step} />

      {step === 1 && (
        <ProjectTypeSelector
          value={formData.type}
          onSelect={(type) => {
            setFormData({ ...formData, type })
            nextStep()
          }}
        />
      )}

      {step === 2 && (
        <ProjectDetailsForm
          data={formData}
          onChange={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {step === 3 && (
        <ProjectScopeForm
          data={formData}
          onChange={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {step === 4 && (
        <ProjectSummary
          data={formData}
          onSubmit={handleSubmit}
          onBack={prevStep}
          loading={loading}
        />
      )}

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
