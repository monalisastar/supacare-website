'use client'

import React from 'react'
import { Paperclip, User, Building2, FileText, Loader2 } from 'lucide-react'

interface ConsultancySummaryProps {
  data: any
  onSubmit: () => void
  onBack: () => void
  loading?: boolean
}

export default function ConsultancySummary({
  data,
  onSubmit,
  onBack,
  loading = false,
}: ConsultancySummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-700">
        Review Consultancy Request
      </h2>

      <div className="border rounded-lg p-6 bg-white space-y-4 text-gray-800 shadow-sm">
        {/* 🏢 Company Info */}
        <div className="flex items-center gap-2">
          <Building2 size={18} className="text-green-600" />
          <p>
            <b>Company / Organization:</b> {data.company || '—'}
          </p>
        </div>

        {/* 🧩 Consultancy Type */}
        <p>
          <b>Consultancy Type:</b> {data.type || '—'}
        </p>

        {/* 👤 Contact Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User size={16} className="text-green-600" />
            <p>
              <b>Contact Person:</b> {data.contactName || '—'}
            </p>
          </div>
          <p>
            <b>Designation:</b> {data.designation || '—'}
          </p>
          <p>
            <b>Email:</b> {data.contactEmail || '—'}
          </p>
          <p>
            <b>Phone:</b> {data.contactPhone || '—'}
          </p>
        </div>

        {/* 🧾 Consultancy Description */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText size={16} className="text-green-600" />
            <b>Description of Consultancy Need:</b>
          </div>
          <p className="text-gray-700 mt-1 whitespace-pre-line">
            {data.description || '—'}
          </p>
        </div>

        {/* 📎 Attached Documents */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Paperclip size={16} className="text-green-600" />
            <b>Attached Documents:</b>
          </div>
          {data.documents?.length ? (
            <ul className="list-disc pl-6 mt-1 text-gray-700">
              {data.documents.map((file: File, i: number) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No documents uploaded</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Request'
          )}
        </button>
      </div>
    </div>
  )
}
