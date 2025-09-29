// /app/dashboard/smart-waste/alerts/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface BinAlert {
  id: string;
  location: string;
  fillLevel: number;
  alertLevel: "High" | "Medium" | "Low";
  aiRiskScore: number; // 0-100
  timestamp: string;
  status: "Active" | "Resolved";
}

// Simulated IoT alerts
const initialAlerts: BinAlert[] = [
  { id: "B01", location: "Main Street", fillLevel: 92, alertLevel: "High", aiRiskScore: 90, timestamp: "2025-09-29 10:05", status: "Active" },
  { id: "B02", location: "Park Avenue", fillLevel: 65, alertLevel: "Medium", aiRiskScore: 60, timestamp: "2025-09-29 09:30", status: "Active" },
  { id: "B03", location: "Market Square", fillLevel: 40, alertLevel: "Low", aiRiskScore: 30, timestamp: "2025-09-28 16:20", status: "Resolved" },
];

// Weekly alert trend for chart
const weeklyAlertData = [
  { week: "Week 1", alerts: 5 },
  { week: "Week 2", alerts: 8 },
  { week: "Week 3", alerts: 6 },
  { week: "Week 4", alerts: 10 },
];

export default function SmartWasteAlerts() {
  const [alerts, setAlerts] = useState<BinAlert[]>(initialAlerts);
  const [filterStatus, setFilterStatus] = useState<"All" | "Active" | "Resolved">("All");
  const [filterLevel, setFilterLevel] = useState<"All" | "High" | "Medium" | "Low">("All");

  const filteredAlerts = alerts.filter(alert => {
    if (filterStatus !== "All" && alert.status !== filterStatus) return false;
    if (filterLevel !== "All" && alert.alertLevel !== filterLevel) return false;
    return true;
  });

  const getBadge = (level: "High" | "Medium" | "Low") => {
    if (level === "High") return <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">High ⚠️</span>;
    if (level === "Medium") return <span className="px-2 py-1 text-xs bg-yellow-400 text-white rounded-full">Medium ⚠️</span>;
    return <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">Low ✅</span>;
  };

  const toggleStatus = (id: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, status: a.status === "Active" ? "Resolved" : "Active" } : a))
    );
  };

  return (
    <div className="p-6 min-h-screen bg-lime-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Smart Waste Alerts</h1>
        <Link
          href="/dashboard/smart-waste/overview"
          className="px-4 py-2 bg-lime-500 text-white rounded shadow hover:bg-lime-600 transition"
        >
          Return to Overview
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["All", "Active", "Resolved"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-4 py-1 rounded-full font-semibold transition ${
              filterStatus === f ? "bg-lime-500 text-white" : "bg-white/20 text-gray-800 hover:bg-white/30"
            }`}
          >
            {f}
          </button>
        ))}
        {(["All", "High", "Medium", "Low"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilterLevel(f)}
            className={`px-4 py-1 rounded-full font-semibold transition ${
              filterLevel === f ? "bg-gray-700 text-white" : "bg-white/20 text-gray-800 hover:bg-white/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Alerts</h2>
          <p className="text-3xl font-bold text-gray-900">{alerts.length}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Active</h2>
          <p className="text-3xl font-bold text-red-500">{alerts.filter(a => a.status === "Active").length}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Resolved</h2>
          <p className="text-3xl font-bold text-green-500">{alerts.filter(a => a.status === "Resolved").length}</p>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg overflow-x-auto mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Alerts List</h3>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">Bin ID</th>
              <th className="p-2 border-b">Location</th>
              <th className="p-2 border-b">Fill Level</th>
              <th className="p-2 border-b">Alert Level</th>
              <th className="p-2 border-b">AI Risk</th>
              <th className="p-2 border-b">Timestamp</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map(alert => (
              <tr key={alert.id}>
                <td className="p-2 border-b">{alert.id}</td>
                <td className="p-2 border-b">{alert.location}</td>
                <td className="p-2 border-b">{alert.fillLevel}%</td>
                <td className="p-2 border-b">{getBadge(alert.alertLevel)}</td>
                <td className="p-2 border-b">{alert.aiRiskScore}%</td>
                <td className="p-2 border-b">{alert.timestamp}</td>
                <td className={`p-2 border-b font-semibold ${alert.status === "Active" ? "text-red-500" : "text-green-500"}`}>
                  {alert.status}
                </td>
                <td className="p-2 border-b">
                  <button
                    className="px-3 py-1 bg-lime-500 text-white rounded hover:bg-lime-600 transition"
                    onClick={() => toggleStatus(alert.id)}
                  >
                    {alert.status === "Active" ? "Resolve" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alert Trend Chart */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Weekly Alert Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyAlertData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="alerts" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
