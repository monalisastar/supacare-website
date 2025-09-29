"use client";

import { useParams, useRouter } from "next/navigation";
import ProjectCard from "../../../components/ProjectCard";
import Link from "next/link";

// Example data (same as routes page)
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
    files: [
      { name: "Route Map.pdf", url: "/files/route-001-map.pdf" },
      { name: "Pickup Checklist.pdf", url: "/files/route-001-checklist.pdf" },
    ],
  },
  {
    id: "route-002",
    title: "Riverside School Collection",
    type: "Institutional",
    scheduledDate: "2025-10-07",
    status: "Pending",
    team: ["Charlie", "David"],
    address: "Riverside School, Nairobi",
    notes: "",
    files: [],
  },
  {
    id: "route-003",
    title: "Greenfield Commercial Estate",
    type: "Commercial",
    scheduledDate: "2025-10-09",
    status: "Active",
    team: ["Eva", "Frank"],
    address: "Greenfield Estate, Nairobi",
    notes: "",
    files: [],
  },
];

export default function RouteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const route = routes.find((r) => r.id === params.id);

  if (!route) {
    return (
      <div className="p-6 md:p-10 bg-green-50 min-h-screen">
        <p className="text-red-600 font-bold">Route not found.</p>
        <Link
          href="/dashboard/waste-collection/routes"
          className="inline-block mt-4 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition"
        >
          ← Back to Routes
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard/waste-collection/routes"
          className="inline-block px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition"
        >
          ← Back to Routes
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{route.title}</h1>
      </div>

      {/* Route Details */}
      <ProjectCard
        title={route.title}
        description={`${route.type} waste collection at ${route.address}. ${route.notes}`}
        deadline={route.scheduledDate}
        team={route.team}
        status={route.status}
        files={route.files}
        // Admin props (optional for later)
        // onEdit={() => {}}
        // onChangeStatus={(status) => {}}
      />
    </div>
  );
}
