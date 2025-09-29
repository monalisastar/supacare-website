"use client";

import ProjectCard from "../components/ProjectCard"; // adjust path
import Link from "next/link";

const consultancyProjects = [
  {
    title: "Project Alpha",
    status: "Active",
    description: "Consultancy for waste management optimization.",
    team: ["Alice", "Bob"],
  },
  {
    title: "Project Beta",
    status: "Completed",
    description: "Smart tracking system deployment.",
    team: ["Charlie", "David"],
  },
  {
    title: "Project Gamma",
    status: "Active",
    description: "Recycling program consultancy for local industries.",
    team: ["Eva", "Frank"],
  },
  {
    title: "Project Delta",
    status: "Pending",
    description: "New project proposal awaiting approval.",
    team: ["Grace", "Hannah"],
  },
];

export default function ConsultancyDashboard() {
  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Consultancy Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultancyProjects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            deadline={project.status} // or you can use a separate date field
            team={project.team}
            status={project.status}
            onEdit={() => console.log(`Edit ${project.title}`)}
            onChangeStatus={(newStatus) =>
              console.log(`Change ${project.title} status to ${newStatus}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
