// src/app/team/components/TeamSection.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ✅ Import from lib
import { teamMembers, TeamMember } from '@/lib/teamMembers';
import TeamMemberCard from './TeamMemberCard';
import TeamMemberModal from './TeamMemberModal';

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [paddingTop, setPaddingTop] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Dynamically calculate padding top based on navbar height
  useEffect(() => {
    const navbar = document.querySelector('nav'); // assuming your navbar uses <nav>
    if (navbar) {
      const extraSpacing = 80; // extra space so heading isn't too close
      setPaddingTop(navbar.clientHeight + extraSpacing);
    }
  }, []);

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
  const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <section
        ref={sectionRef}
        className="max-w-6xl mx-auto px-4 py-16"
        style={{ paddingTop }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-12 text-center">
          Our Team Members
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member) => (
            <motion.article key={member.name} variants={cardVariants}>
              <TeamMemberCard member={member} onClick={setSelectedMember} />
            </motion.article>
          ))}
        </motion.div>
      </section>

      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
}
