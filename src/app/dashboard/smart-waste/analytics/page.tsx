// /app/dashboard/smart-waste/analytics/page.tsx
"use client";

import { useState } from "react";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface BinData {
  id: string;
  location: string;
  fillLevel: number;
  alert: boolean;
  aiScore: "Low" | "Medium" | "High";
}

// Sample bin data
const bins: BinData[] = [
  { id: "B01", location: "Main Street", fillLevel: 75, alert: true, aiScore: "High" },
  { id: "B02", location: "Park Avenue", fillLevel: 40, alert: false, aiScore: "Low" },
  { id: "B03", location: "Market Square", fillLevel: 90, alert: true, aiScore: "High" },
  { id: "B04", location: "East Zone", fillLevel: 60, alert: false, aiScore: "Medium" },
];

// Historical data for charts
const fillTrendData = [
  { week: "Week 1", avgFill: 65 },
  { week: "Week 2", avgFill: 70 },
  { week: "Week 3", avgFill: 75 },
  { week: "Week 4", avgFill: 68 },
];

const alertTrendData = [
  { week: "Week 1", alerts: 2 },
  { week: "Week 2", alerts: 4 },
  { week: "Week 3", alerts: 3 },
  { week: "Week 4", alerts: 5 },
];

const aiRiskData = [
  { name: "Low", value: bins.filter(b => b.aiScore === "Low").length },
  { name: "Medium", value: bins.filter(b => b.aiScore === "Medium").length },
  { name: "High", value: bins.filter(b => b.aiScore === "High").length },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function SmartWasteAnalytics() {
  const [filter, setFilter] = useState<"All" | "High" | "Medium" | "Low">("All");

  const filteredBins = bins.filter(bin => {
    if (filter === "All") return true;
    return bin.aiScore === filter;
  });

  return (
    <div className="p-6 min-h-screen bg-lime-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Smart Waste Analytics</h1>
        <Link
          href="/dashboard/smart-waste/overview"
          className="px-4 py-2 bg-lime-500 text-white rounded shadow hover:bg-lime-600 transition"
        >
          Return to Overview
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["All", "High", "Medium", "Low"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-white font-semibold transition ${
              filter === f
                ? f === "High"
                  ? "bg-red-500"
                  : f === "Medium"
                  ? "bg-yellow-400"
                  : f === "Low"
                  ? "bg-green-500"
                  : "bg-lime-500"
                : "bg-white/20 text-gray-800 hover:bg-white/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Bins</h2>
          <p className="text-3xl font-bold text-gray-900">{bins.length}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Active Alerts</h2>
          <p className="text-3xl font-bold text-red-500">{bins.filter(b => b.alert).length}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Avg Fill Level</h2>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(bins.reduce((acc, b) => acc + b.fillLevel, 0) / bins.length)}%
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">AI Risk Bins</h2>
          <p className="text-3xl font-bold text-gray-900">{aiRiskData.find(d => d.name === "High")?.value}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Fill Trend */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Avg Fill Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={fillTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgFill" stroke="#84cc16" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts Trend */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Alerts Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alertTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="alerts" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Risk Pie */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={aiRiskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                label
              >
                {aiRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bin Ranking Table */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Bin Ranking</h3>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Location</th>
              <th className="p-2 border-b">Fill Level</th>
              <th className="p-2 border-b">Alert</th>
              <th className="p-2 border-b">AI Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredBins
              .sort((a, b) => b.fillLevel - a.fillLevel)
              .map(bin => (
                <tr key={bin.id}>
                  <td className="p-2 border-b">{bin.id}</td>
                  <td className="p-2 border-b">{bin.location}</td>
                  <td className="p-2 border-b">{bin.fillLevel}%</td>
                  <td className={`p-2 border-b font-bold ${bin.alert ? "text-red-500" : "text-green-500"}`}>
                    {bin.alert ? "⚠️" : "✅"}
                  </td>
                  <td className="p-2 border-b">{bin.aiScore}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
