"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "../../components/ProjectCard";

type Project = {
  id: string;
  title: string;
  description: string;
  team: string[];
  status: "NEW" | "ACTIVE" | "COMPLETED";
};

type Role = "ADMIN" | "CONSULTANT" | "CLIENT"; // example, replace with actual auth

export default function ConsultancyDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"NEW" | "ACTIVE" | "COMPLETED">(
    "NEW"
  );

  const currentUserRole: Role = "ADMIN"; // replace with actual auth

  // Fetch projects based on active tab
  const fetchProjects = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      switch (activeTab) {
        case "NEW":
          endpoint = "/api/consultancy/projects/new";
          break;
        case "ACTIVE":
          endpoint = "/api/consultancy/projects/active";
          break;
        case "COMPLETED":
          endpoint = "/api/consultancy/projects/completed";
          break;
      }

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeTab]);

  // Handle status change (NEW → ACTIVE → COMPLETED)
  const handleChangeStatus = async (projectId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/consultancy/projects/${projectId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Update local state immediately
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, status: newStatus as any } : p))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update project status.");
    }
  };

  // Refresh projects manually or after redirect from New Project page
  const handleRefresh = () => fetchProjects();

  if (loading) return <div className="p-6">Loading projects...</div>;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Consultancy Projects</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        {["NEW", "ACTIVE", "COMPLETED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={handleRefresh}
          className="ml-auto px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Refresh
        </button>
      </div>

      {projects.length === 0 ? (
        <div>No projects found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            // Determine available status actions based on role
            let statusOptions: string[] = [];
            if (currentUserRole === "ADMIN" || currentUserRole === "CONSULTANT") {
              if (project.status === "NEW") statusOptions = ["ACTIVE"];
              if (project.status === "ACTIVE") statusOptions = ["COMPLETED"];
            }

            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                deadline={project.status} // replace with real deadline field if available
                team={project.team}
                status={project.status}
                onEdit={() => console.log(`Edit ${project.title}`)}
                onChangeStatus={(newStatus) =>
                  handleChangeStatus(project.id, newStatus)
                }
                statusOptions={statusOptions}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
