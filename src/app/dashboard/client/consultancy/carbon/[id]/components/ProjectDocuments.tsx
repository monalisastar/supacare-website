'use client'

import React from 'react'
import { FileText, Download } from 'lucide-react'

interface Document {
  id: string
  name: string
  url: string
}

interface Props {
  project: {
    documents?: Document[]
  }
}

export default function ProjectDocuments({ project }: Props) {
  const docs = project.documents || []

  return (
    <section className="bg-white rounded-xl border border-green-100 shadow-sm p-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-green-700 mb-4 flex items-center space-x-2">
        <FileText size={18} className="text-green-600" />
        <span>Project Documents</span>
      </h2>

      {/* Empty state */}
      {docs.length === 0 ? (
        <p className="text-gray-500 text-sm">No uploaded documents yet.</p>
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between border border-green-50 rounded-lg p-3 hover:bg-green-50 transition"
            >
              <span className="text-gray-700 text-sm truncate max-w-[75%]">
                {doc.name}
              </span>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
              >
                <Download size={14} className="mr-1" /> Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
