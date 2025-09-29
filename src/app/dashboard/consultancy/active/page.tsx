"use client";

import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";


const activeProjects = [
  {
    title: "Waste Reduction Initiative",
    description: "Helping municipalities optimize waste collection and recycling programs.",
    deadline: "2025-12-31",
    team: ["Alice", "Bob"],
  },
  {
    title: "Green Energy Assessment",
    description: "Consultancy for industries to switch to sustainable energy sources.",
    deadline: "2025-11-15",
    team: ["Charlie", "David"],
  },
  {
    title: "Urban Composting Program",
    description: "Implementing city-wide composting solutions for organic waste.",
    deadline: "2025-10-20",
    team: ["Eva", "Frank"],
  },
];

export default function ActiveProjects({ isAdmin = false }: { isAdmin?: boolean }) {
  const handleEdit = (title: string) => {
    console.log("Edit project:", title);
  };

  const handleStatusChange = (title: string, status: string) => {
    console.log(`Change status of ${title} to ${status}`);
  };

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
        Active Environmental Consultancy Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeProjects.map((project, idx) => (
          <ProjectCard
            key={idx}
            title={project.title}
            description={project.description}
            deadline={project.deadline}
            team={project.team}
            status={isAdmin ? "active" : undefined}
            onEdit={isAdmin ? () => handleEdit(project.title) : undefined}
            onChangeStatus={isAdmin ? (status) => handleStatusChange(project.title, status) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
