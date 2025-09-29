// /app/dashboard/smart-waste/overview/page.tsx
"use client";

import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const auditData = [
  { month: "Jan", audits: 5 },
  { month: "Feb", audits: 8 },
  { month: "Mar", audits: 12 },
  { month: "Apr", audits: 9 },
  { month: "May", audits: 15 },
];

const alertData = [
  { week: "Week 1", alerts: 2 },
  { week: "Week 2", alerts: 5 },
  { week: "Week 3", alerts: 3 },
  { week: "Week 4", alerts: 4 },
];

const insightData = [
  { week: "Week 1", insights: 1 },
  { week: "Week 2", insights: 3 },
  { week: "Week 3", insights: 4 },
  { week: "Week 4", insights: 5 },
];

export default function SmartWasteOverview() {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-lime-500 text-white rounded shadow hover:bg-lime-600 transition"
        >
          Return to Dashboard
        </Link>
      </div>

      <p className="mb-8 text-gray-600">
        Monitor overall waste management performance and access quick insights from audits, alerts, and reports in one place.
      </p>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Audits */}
        <div className="bg-lime-500/30 backdrop-blur-md border border-lime-300/40 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Audits</h2>
          <p className="text-3xl font-bold text-gray-900">{auditData.reduce((sum, d) => sum + d.audits, 0)}</p>
          <p className="text-gray-600 mt-1 text-sm">Completed audits this month</p>
        </div>

        {/* Active Alerts */}
        <div className="bg-lime-500/30 backdrop-blur-md border border-lime-300/40 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Active Alerts</h2>
          <p className="text-3xl font-bold text-red-500">{alertData[alertData.length - 1].alerts}</p>
          <p className="text-gray-600 mt-1 text-sm">Current ongoing issues</p>
        </div>

        {/* Insights & Reports */}
        <div className="bg-lime-500/30 backdrop-blur-md border border-lime-300/40 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Insights & Reports</h2>
          <p className="text-3xl font-bold text-gray-900">{insightData.reduce((sum, d) => sum + d.insights, 0)}</p>
          <p className="text-gray-600 mt-1 text-sm">Generated insights this month</p>
        </div>

        {/* Request Smart Audit */}
        <div className="bg-lime-500/30 backdrop-blur-md border border-lime-300/40 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Request Smart Audit</h2>
          <p className="text-gray-600 mt-1 text-sm">Quickly schedule and review audits</p>
          <Link
            href="/dashboard/smart-waste/audit"
            className="mt-4 inline-block px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition"
          >
            Go to Audit
          </Link>
        </div>
      </div>

      {/* Dynamic Charts */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audits Line Chart */}
        <div className="bg-lime-500/30 backdrop-blur-md border border-lime-300/40 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Audits Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={auditData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="audits" stroke="#ffffff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts Bar Chart */}
        <div className="bg-lime-500/30 backdrop-blur-md border border-lime-300/40 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Active Alerts</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alertData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="alerts" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Line Chart */}
        <div className="bg-lime-500/30 backdrop-blur-md border border-lime-300/40 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Insights Generated</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={insightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="insights" stroke="#ffffff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
