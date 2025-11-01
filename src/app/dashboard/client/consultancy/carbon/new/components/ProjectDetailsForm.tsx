'use client'

import React, { useState } from 'react'

interface Props {
  data: any
  onChange: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function ProjectDetailsForm({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

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
    const newErrors: { [key: string]: string } = {}
    if (!data.company) newErrors.company = 'Company or organization name is required.'
    if (!data.representative) newErrors.representative = 'Representative name is required.'
    if (!data.email) newErrors.email = 'Contact email is required.'
    if (!data.phone) newErrors.phone = 'Phone number is required.'
    if (!data.name) newErrors.name = 'Project name is required.'
    if (!data.location) newErrors.location = 'Location is required.'
    if (!data.beneficiaries) newErrors.beneficiaries = 'Please specify beneficiaries.'
    if (!data.description) newErrors.description = 'Project description is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onNext()
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-green-700">Enter Project Details</h2>
      <p className="text-sm text-gray-500">
        Selected Category:{' '}
        <span className="font-medium text-green-600">{data.type || '—'}</span>
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
          placeholder="e.g. Supacare Energy Ltd"
        />
        {errors.company && (
          <p className="text-red-600 text-sm mt-1">{errors.company}</p>
        )}
      </div>

      {/* 👤 Representative Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Representative Name
          </label>
          <input
            type="text"
            name="representative"
            value={data.representative || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Jane Mwangi"
          />
          {errors.representative && (
            <p className="text-red-600 text-sm mt-1">{errors.representative}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation / Title
          </label>
          <input
            type="text"
            name="designation"
            value={data.designation || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Environmental Officer"
          />
        </div>
      </div>

      {/* 📧 Contact Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. jane.mwangi@company.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone || ''}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
            placeholder="+254 712 345 678"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* 🏗️ Project Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Name
        </label>
        <input
          type="text"
          name="name"
          value={data.name || ''}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g. Clean Cookstove Initiative"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* 📍 Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={data.location || ''}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g. Nakuru, Kenya"
        />
        {errors.location && (
          <p className="text-red-600 text-sm mt-1">{errors.location}</p>
        )}
      </div>

      {/* 👥 Beneficiaries */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Beneficiaries
        </label>
        <input
          type="text"
          name="beneficiaries"
          value={data.beneficiaries || ''}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g. 200 households, 3 institutions"
        />
        {errors.beneficiaries && (
          <p className="text-red-600 text-sm mt-1">{errors.beneficiaries}</p>
        )}
      </div>

      {/* 🧾 Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Description
        </label>
        <textarea
          name="description"
          value={data.description || ''}
          onChange={handleInputChange}
          rows={4}
          className="w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Describe your project goals, technologies, or expected impact."
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* 📎 Project Documents */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Documents (optional)
        </label>
        <input
          type="file"
          name="documents"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileUpload}
          className="w-full border rounded-lg p-2 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        <p className="text-xs text-gray-500 mt-1">
          Upload feasibility studies, photos, or permits (optional).
        </p>

        {data.documents?.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
            {data.documents.map((file: File, idx: number) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔘 Buttons */}
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
