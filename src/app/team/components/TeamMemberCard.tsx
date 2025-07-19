// src/app/team/components/TeamMemberCard.tsx

'use client';

import Tilt from 'react-parallax-tilt';

type TeamMember = {
  name: string;
  role: string;
  photoUrl: string;
};

type Props = {
  member: TeamMember;
  onClick: (member: TeamMember) => void;
};

export default function TeamMemberCard({ member, onClick }: Props) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`View details about ${member.name}`}
      onClick={() => onClick(member)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick(member);
      }}
      className="focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400 cursor-pointer"
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#34D399"
        glarePosition="bottom"
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
      >
        <img
          src={member.photoUrl}
          alt={member.name}
          className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-green-300 shadow-sm"
          loading="lazy"
        />
        <h3 className="text-xl font-semibold text-green-900">{member.name}</h3>
        <p className="text-green-700 mt-1">{member.role}</p>
      </Tilt>
    </div>
  );
}
