// src/app/team/components/TeamMemberCard.tsx
'use client';

import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import { TeamMember } from '@/lib/teamMembers';

type Props = {
  member: TeamMember; // includes bio, email, linkedin
  onClick: (member: TeamMember) => void;
};

export default function TeamMemberCard({ member, onClick }: Props) {
  // Safe avatar URL with fallback
  const avatarUrl = member.photoUrl?.trim() || '/images/default-avatar.png';

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`View details about ${member.name}`}
      onClick={() => onClick(member)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick(member);
      }}
      className="relative focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400 cursor-pointer"
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#34D399"
        glarePosition="bottom"
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden"
      >
        <div className="relative w-40 h-40 mb-6 border-4 border-green-300 shadow-sm rounded-full overflow-hidden">
          <Image
            src={avatarUrl}
            alt={member.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="160px"
            priority={false}
          />
        </div>

        <h3 className="text-xl font-semibold text-green-900">{member.name}</h3>
        <p className="text-green-700 mt-1">{member.role}</p>

        {/* Optional hover bio preview */}
        <div className="absolute inset-0 bg-white bg-opacity-90 p-4 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-center rounded-lg">
          <p className="text-sm text-green-800">
            {member.bio.length > 100 ? member.bio.slice(0, 100) + '...' : member.bio}
          </p>
        </div>
      </Tilt>
    </div>
  );
}
