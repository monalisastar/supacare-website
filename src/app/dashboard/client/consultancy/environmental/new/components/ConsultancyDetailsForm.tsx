'use client'

import React, { useState } from 'react'

interface ConsultancyDetailsFormProps {
  data: {
    type: string
    company: string
    contactName: string
    contactEmail: string
    contactPhone: string
    designation: string
    description: string
    documents: File[]
  }
  onChange: (data: any) => void
  onNext: () => void
  onBack: () => void
}

/**
 * 🧾 ConsultancyDetailsForm
 * -------------------------------------------------
 * Step 2 of the client consultancy creation flow.
 * Handles input validation, dynamic updates, and uploads.
 */
export default function ConsultancyDetailsForm({
  data,
  onChange,
  onNext,
  onBack,
}: ConsultancyDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    onChange({ ...data, documents: files })
  }

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {}
    if (!data.company) newErrors.company = 'Company or organization name is required.'
    if (!data.contactName) newErrors.contactName = 'Contact person name is required.'
    if (!data.contactEmail) newErrors.contactEmail = 'Contact email is required.'
    if (!data.contactPhone) newErrors.contactPhone = 'Contact phone number is required.'
    if (!data.description) newErrors.description = 'Description of consultancy need is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onNext()
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-green-700">
        Enter Consultancy Details
      </h2>

      <p className="text-sm text-gray-500">
        Selected Type:{' '}
        <span className="font-medium text-green-600">{data.type}</span>
      </p>

      {/* 🏢 Company / Organization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company / Organization
        </label>
        <input
          type="text"
          name="company"
          value={data.company || ''}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g. Supacare Solutions Ltd"
        />
        {errors.company && (
          <p className="text-red-600 text-sm mt-1">{errors.company}</p>
        )}
      </div>

      {/* 👤 Contact Person */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            type="text"
            name="contactName"
            value={data.contactName || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Full name of representative"
          />
          {errors.contactName && (
            <p className="text-red-600 text-sm mt-1">{errors.contactName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation / Role
          </label>
          <input
            type="text"
            name="designation"
            value={data.designation || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Sustainability Officer"
          />
        </div>
      </div>

      {/* 📧 Contact Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="contactEmail"
            value={data.contactEmail || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. name@company.com"
          />
          {errors.contactEmail && (
            <p className="text-red-600 text-sm mt-1">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={data.contactPhone || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. +254 700 123 456"
          />
          {errors.contactPhone && (
            <p className="text-red-600 text-sm mt-1">{errors.contactPhone}</p>
          )}
        </div>
      </div>

      {/* 🧾 Consultancy Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Describe Your Consultancy Need
        </label>
        <textarea
          name="description"
          value={data.description || ''}
          onChange={handleInputChange}
          rows={4}
          className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Explain what support you need — e.g., EIA report preparation, ESG audit, etc."
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* 📎 Document Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supporting Documents (optional)
        </label>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileUpload}
          className="w-full border rounded-lg p-2 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        {data.documents?.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
            {data.documents.map((file: File, idx: number) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔘 Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>

        <button
          onClick={validateAndProceed}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}
