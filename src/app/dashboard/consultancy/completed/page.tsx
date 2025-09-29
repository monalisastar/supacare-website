"use client";

import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";


const completedProjects = [
  {
    title: "River Cleanup Campaign",
    description: "City-wide river cleanup program completed successfully.",
    completedDate: "2025-08-15",
    team: ["Alice", "Bob"],
  },
  {
    title: "Solar Panel Installation Audit",
    description: "Consultancy for installing solar panels in industrial zones completed.",
    completedDate: "2025-07-30",
    team: ["Charlie", "David"],
  },
  {
    title: "Community Composting Program",
    description: "Implemented composting solutions for residential communities.",
    completedDate: "2025-06-20",
    team: ["Eva", "Frank"],
  },
];

export default function CompletedProjects() {
  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      {/* Return to Dashboard */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition"
        >
          ← Return to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Completed Environmental Consultancy Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedProjects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            deadline={project.completedDate} // reused as deadline/completion date
            team={project.team}
          />
        ))}
      </div>
    </div>
  );
}
