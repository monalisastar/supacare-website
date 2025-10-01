"use client";

import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import Card from "./Card"; // glassmorphism card

interface WasteData {
  routes: number;
  bins: number;
  upcomingPickups: number;
}

export default function WasteManagementCard() {
  // Placeholder data
  const data: WasteData = {
    routes: 3,
    bins: 120,
    upcomingPickups: 5,
  };

  return (
    <Card className="col-span-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaTrashAlt className="text-red-400 text-2xl" />
        <h3 className="text-xl font-semibold text-gray-100">
          Waste Management
        </h3>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[
          { label: "Active Routes", value: data.routes },
          { label: "Bins Deployed", value: data.bins },
          { label: "Upcoming Pickups", value: data.upcomingPickups },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-white/30 p-3 rounded text-center"
          >
            <p className="text-lg font-bold">{metric.value}</p>
            <p>{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard/waste-collection/schedule"
          className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
        >
          Schedule Pickup
        </Link>
        <Link
          href="/dashboard/waste-collection/bins"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Manage Bins
        </Link>
      </div>
    </Card>
  );
}
