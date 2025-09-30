"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";

type Project = {
  id: string;
  title: string;
  description: string;
  team: string[];
  status: "NEW" | "ACTIVE" | "COMPLETED";
};

type Role = "ADMIN" | "CONSULTANT" | "CLIENT";

export default function ActiveProjects({ role = "ADMIN" as Role }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch active projects
  useEffect(() => {
    async function fetchActiveProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/consultancy/projects/active");
        if (!res.ok) throw new Error("Failed to fetch active projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchActiveProjects();
  }, []);

  // Status change handler
  const handleStatusChange = async (projectId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/consultancy/projects/${projectId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      // Update local state
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, status: newStatus as any } : p))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update project status.");
    }
  };

  if (loading) return <div className="p-6">Loading projects...</div>;

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

      {projects.length === 0 ? (
        <div>No active projects found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            // Determine allowed status changes
            let statusOptions: string[] = [];
            if (role === "ADMIN" || role === "CONSULTANT") {
              if (project.status === "ACTIVE") statusOptions = ["COMPLETED"];
            }

            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                deadline={project.status} // or real deadline if available
                team={project.team}
                status={project.status}
                onEdit={role === "ADMIN" ? () => console.log(`Edit ${project.title}`) : undefined}
                onChangeStatus={statusOptions.length > 0 ? (newStatus) => handleStatusChange(project.id, newStatus) : undefined}
                statusOptions={statusOptions}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
