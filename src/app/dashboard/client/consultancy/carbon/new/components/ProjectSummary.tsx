'use client'

import React from 'react'
import { Paperclip } from 'lucide-react'

interface ProjectSummaryProps {
  data: any
  onSubmit: () => void
  onBack: () => void
  loading?: boolean
}

export default function ProjectSummary({
  data,
  onSubmit,
  onBack,
  loading = false,
}: ProjectSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-700">Review Carbon Consultancy Details</h2>

      <div className="border rounded-lg p-6 bg-white space-y-4 text-gray-800 shadow-sm">
        {/* 🧩 Basic Info */}
        <p>
          <b>Project Type:</b> {data.type || '—'}
        </p>
        <p>
          <b>Project Name:</b> {data.name || '—'}
        </p>
        <p>
          <b>Location:</b> {data.location || '—'}
        </p>
        <p>
          <b>Beneficiaries:</b> {data.beneficiaries || '—'}
        </p>
        <p>
          <b>Scope:</b> {data.scope || '—'}
        </p>

        {/* 🧾 Description */}
        <div>
          <b>Project Description:</b>
          <p className="text-gray-700 mt-1 whitespace-pre-line">
            {data.description || '—'}
          </p>
        </div>

        {/* 📎 Attached Documents */}
        {data.documents && data.documents.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Paperclip size={16} className="text-green-600" />
              <b>Attached Documents:</b>
            </div>
            <ul className="list-disc pl-6 mt-1 text-gray-700">
              {data.documents.map((file: File, i: number) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 🚀 Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          disabled={loading}
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white ${
            loading
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </div>
  )
}
