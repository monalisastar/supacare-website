// src/app/team/components/TeamMemberModal.tsx
'use client';

import { useState } from 'react';
import { TeamMember } from '@/lib/teamMembers';

type Props = {
  member: TeamMember;
  onClose: () => void;
};

export default function TeamMemberModal({ member, onClose }: Props) {
  const [showFullBio, setShowFullBio] = useState(false);
  const toggleBio = () => setShowFullBio((prev) => !prev);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full p-8 relative shadow-lg overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-green-300 shadow-sm"
          />
          <div className="flex-1">
            <h3 id="modal-title" className="text-2xl font-bold text-green-900 mb-2">{member.name}</h3>
            <p className="text-green-700 italic mb-4">{member.role}</p>
            <p className="text-green-800 whitespace-pre-line">
              {showFullBio
                ? member.bio
                : member.bio.length > 300
                  ? member.bio.slice(0, 300) + '...'
                  : member.bio}
            </p>

            {member.bio.length > 300 && (
              <button
                onClick={toggleBio}
                className="mt-2 text-green-700 underline focus:outline-none"
                aria-expanded={showFullBio}
              >
                {showFullBio ? 'Read less' : 'Read more'}
              </button>
            )}

            <div className="mt-6 space-x-4">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-block px-5 py-2 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Email
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
