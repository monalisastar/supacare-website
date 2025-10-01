"use client";

import ProjectCard from "../../components/ProjectCard";
import Link from "next/link";

// Example static routes data (later replace with API fetch)
const routes = [
  {
    id: "route-001",
    title: "Eden Court Dustbin Route",
    type: "Domestic",
    scheduledDate: "2025-10-05",
    status: "Active",
    team: ["Alice", "Bob"],
    address: "Eden Court Estate, Nairobi",
    notes: "Use gloves for biohazard waste",
  },
  {
    id: "route-002",
    title: "Riverside School Collection",
    type: "Institutional",
    scheduledDate: "2025-10-07",
    status: "Pending",
    team: ["Charlie", "David"],
    address: "Riverside School, Nairobi",
  },
  {
    id: "route-003",
    title: "Greenfield Commercial Estate",
    type: "Commercial",
    scheduledDate: "2025-10-09",
    status: "Active",
    team: ["Eva", "Frank"],
    address: "Greenfield Estate, Nairobi",
  },
];

export default function RoutesPage() {
  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-block px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition"
          >
            ← Return to Dashboard
          </Link>

          {/* New Route Button */}
          <Link
            href="/dashboard/waste-collection/new"
            className="inline-block px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition"
          >
            + New Route
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Waste Collection Routes
        </h1>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <ProjectCard
            key={route.id}
            title={route.title}
            description={`${route.type} waste collection route at ${route.address}`}
            deadline={route.scheduledDate}
            team={route.team}
            status={route.status}
            files={[]}
            viewLink={`/dashboard/waste-collection/routes/${route.id}`}
          />
        ))}
      </div>
    </div>
  );
}
