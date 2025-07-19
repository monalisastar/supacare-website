'use client';

import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

type TeamMember = {
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  email?: string;
  linkedin?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Brian Njau Njata",
    role: "Chief Executive Officer (CEO)",
    photoUrl: "/images/brian.jpg",
    bio: `Brian Njau Njata is the visionary director of Supacare Solutions, a company dedicated to sustainable waste management and sanitation. Under his leadership, Supacare Solutions has developed innovative strategies to promote efficient waste disposal, recycling, and eco-friendly sanitation services, ensuring cleaner and healthier communities. With a strong background in law and business, Brian integrates circular economy principles, carbon footprint reduction strategies, and compliance with environmental regulations to drive sustainability. His expertise in greenhouse gas (GHG) accounting and carbon markets further supports the company’s mission to minimize environmental impact while enhancing waste management efficiency. Beyond Supacare Solutions, Brian is actively involved in governance, legal consultancy, and climate action initiatives. His leadership in Silver Dollar Self Help Group and ongoing research in carbon offset projects reflect his commitment to ethical business practices and environmental stewardship. Driven by a passion for sustainability, innovation, and public health, Brian continues to position Supacare Solutions as a leader in waste management and sanitation, creating lasting environmental and social impact.`,
    email: "brian@supacare.co.ke",
    linkedin: "https://linkedin.com/in/brian-njau",
  },
  {
    name: "Virginia Njeri",
    role: "Snr Consultant",
    photoUrl: "/images/virginia.jpg",
    bio: `Virginia Njeri is the Senior Consultant at Supacare Solutions, a company specializing in sustainable waste management, composting, and carbon advisory services. With over 7 years of experience developing carbon projects and 7 years as a carbon projects auditor, Virginia offers a wealth of technical expertise and practical insights into global carbon markets and climate action. Her background in Community Development and Business Management uniquely positions her to bridge the gap between grassroots impact and strategic climate solutions. At Supacare Solutions, she leads initiatives that integrate circular economy principles, focusing on community-based waste management and composting innovations that reduce emissions and enhance soil health. Virginia has successfully developed and audited projects across various standards, including the Verified Carbon Standard (VCS), Gold Standard (GS), Clean Development Mechanism (CDM), and Article 6 frameworks. Her work covers household energy, waste-to-resource programs, and nature-based solutions, aligning environmental sustainability with socio-economic development. At Supacare Solutions, Virginia is dedicated to advancing inclusive climate solutions, equipping communities with the tools and knowledge to actively engage in the carbon economy.`,
    email: "virginia@supacare.co.ke",
    linkedin: "https://linkedin.com/in/virginia-njeri",
  },
  {
    name: "Trizer Chepkemboi Rutto",
    role: "Consultant",
    photoUrl: "/images/trizer.jpg",
    bio: `Trizer Chepkemboi is a dedicated Environmental Science student at Jomo Kenyatta University of Agriculture and Technology (JKUAT) with a strong passion for sustainability, climate action, and responsible waste management. As part of the Supacare Solutions team, she plays a key role in promoting eco-friendly practices, supporting clients in meeting environmental compliance standards, and helping communities transition to sustainable waste solutions. Her academic background, combined with hands-on experience in recycling, composting, and environmental awareness campaigns, makes her a valuable asset in driving forward Supacare’s mission for a cleaner, greener Kenya. Trizer is committed to educating the public, collaborating with stakeholders, and continuously innovating to make environmental conservation a lifestyle.`,
    email: "trizer@supacare.co.ke",
  },
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showFullBio, setShowFullBio] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleBio = () => setShowFullBio((prev) => !prev);

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16">
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
            <motion.article
              key={member.name}
              variants={cardVariants}
            >
              <div
                tabIndex={0}
                role="button"
                aria-label={`View details about ${member.name}`}
                onClick={() => {
                  setSelectedMember(member);
                  setShowFullBio(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedMember(member);
                    setShowFullBio(false);
                  }
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
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedMember(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedMember(null);
          }}
          tabIndex={-1}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-8 relative shadow-lg overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={selectedMember.photoUrl}
                alt={selectedMember.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-green-300 shadow-sm"
              />

              <div className="flex-1">
                <h3 id="modal-title" className="text-2xl font-bold text-green-900 mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-green-700 italic mb-4">{selectedMember.role}</p>

                <p className="text-green-800 whitespace-pre-line">
                  {showFullBio
                    ? selectedMember.bio
                    : selectedMember.bio.length > 300
                    ? selectedMember.bio.slice(0, 300) + '...'
                    : selectedMember.bio}
                </p>

                {selectedMember.bio.length > 300 && (
                  <button
                    onClick={toggleBio}
                    className="mt-2 text-green-700 underline focus:outline-none"
                    aria-expanded={showFullBio}
                  >
                    {showFullBio ? 'Read less' : 'Read more'}
                  </button>
                )}

                <div className="mt-6 space-x-4">
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="inline-block px-5 py-2 bg-green-700 text-white rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Email
                    </a>
                  )}
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
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
      )}
    </>
  );
}
