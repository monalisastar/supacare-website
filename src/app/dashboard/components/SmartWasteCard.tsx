"use client";

import Link from "next/link";
import { FaChartLine } from "react-icons/fa";
import Card from "./Card"; // Glassmorphism card

interface SmartWasteData {
  auditsRequested: number;
  alerts: number;
  reportsAvailable: number;
}

export default function SmartWasteCard() {
  // Placeholder data
  const data: SmartWasteData = {
    auditsRequested: 4,
    alerts: 2,
    reportsAvailable: 3,
  };

  return (
    <Card className="flex flex-col gap-6 p-6 w-full max-w-full lg:max-w-md">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FaChartLine className="text-purple-400 text-2xl" />
        <h3 className="text-xl font-semibold text-gray-100">Smart Waste</h3>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/20 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-gray-100">{data.auditsRequested}</p>
          <p className="text-gray-200 mt-1">Audits Requested</p>
        </div>
        <div className="bg-white/20 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-gray-100">{data.alerts}</p>
          <p className="text-gray-200 mt-1">Alerts</p>
        </div>
        <div className="bg-white/20 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-gray-100">{data.reportsAvailable}</p>
          <p className="text-gray-200 mt-1">Reports Available</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          href="/dashboard/smart-waste/audit"
          className="flex-1 bg-lime-500 text-white px-4 py-2 rounded-lg text-center hover:bg-lime-600 transition"
        >
          Request Audit
        </Link>
        <Link
          href="/dashboard/smart-waste/analytics"
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition"
        >
          View Insights
        </Link>
      </div>
    </Card>
  );
}
