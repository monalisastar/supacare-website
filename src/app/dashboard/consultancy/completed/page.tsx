"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";

type Project = {
  id: string;
  title: string;
  description: string;
  team: string[];
  completedDate: string;
  status: "COMPLETED";
};

export default function CompletedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch completed projects
  useEffect(() => {
    async function fetchCompletedProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/consultancy/projects/completed");
        if (!res.ok) throw new Error("Failed to fetch completed projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCompletedProjects();
  }, []);

  if (loading) return <div className="p-6">Loading completed projects...</div>;

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

      {projects.length === 0 ? (
        <div>No completed projects found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              deadline={project.completedDate} // completion date
              team={project.team}
              status={project.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
