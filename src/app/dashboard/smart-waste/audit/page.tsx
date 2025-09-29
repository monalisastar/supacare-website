"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BinData {
  id: string;
  location: string;
  fillLevel: number;
  lastChecked: string;
  alert: boolean;
  aiScore?: number;
}

// Simulated IoT data
const initialBins: BinData[] = [
  { id: "B01", location: "Main Street", fillLevel: 75, lastChecked: "2025-09-29 10:00", alert: true },
  { id: "B02", location: "Park Avenue", fillLevel: 40, lastChecked: "2025-09-29 09:30", alert: false },
  { id: "B03", location: "Market Square", fillLevel: 90, lastChecked: "2025-09-29 10:15", alert: true },
];

// Dummy audit history
const auditData = [
  { date: "Sep 1", audits: 5 },
  { date: "Sep 8", audits: 7 },
  { date: "Sep 15", audits: 6 },
  { date: "Sep 22", audits: 8 },
  { date: "Sep 29", audits: 9 },
];

export default function SmartWasteAudit() {
  const [bins, setBins] = useState<BinData[]>(initialBins);
  const [selectedBin, setSelectedBin] = useState<BinData | null>(null);
  const [manualNotes, setManualNotes] = useState("");
  const [filter, setFilter] = useState<"All" | "High" | "Medium" | "Low">("All");

  // Simulate IoT + AI score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prev =>
        prev.map(bin => {
          const fill = Math.min(100, Math.max(0, bin.fillLevel + (Math.random() * 20 - 10)));
          const alert = fill > 80;
          const aiScore = Math.max(0, Math.round(100 - fill - (alert ? 10 : 0))); // simple AI scoring
          return { ...bin, fillLevel: fill, alert, aiScore };
        })
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredBins = bins.filter(bin => {
    if (filter === "All") return true;
    if (filter === "High") return bin.fillLevel > 80;
    if (filter === "Medium") return bin.fillLevel > 50 && bin.fillLevel <= 80;
    if (filter === "Low") return bin.fillLevel <= 50;
  });

  const getBadge = (value: number, type: "fill" | "ai") => {
    if (type === "fill") {
      if (value > 80) return <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">High ⚠️</span>;
      if (value > 50) return <span className="px-2 py-1 text-xs bg-yellow-400 text-white rounded-full">Medium ⚠️</span>;
      return <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">Low ✅</span>;
    } else {
      if (value > 80) return <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-full">Critical AI</span>;
      if (value > 50) return <span className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-full">Moderate AI</span>;
      return <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full">Safe AI</span>;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-lime-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Smart Waste Audit</h1>
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
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Alerts Active</h2>
          <p className="text-3xl font-bold text-red-500">{bins.filter(b => b.alert).length}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Avg Fill Level</h2>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(bins.reduce((acc, b) => acc + b.fillLevel, 0) / bins.length)}%
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Avg AI Score</h2>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(bins.reduce((acc, b) => acc + (b.aiScore || 0), 0) / bins.length)}%
          </p>
        </div>
      </div>

      {/* Bin Table */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg overflow-x-auto mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Bin Status</h3>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Location</th>
              <th className="p-2 border-b">Fill Level</th>
              <th className="p-2 border-b">Alert</th>
              <th className="p-2 border-b">AI Score</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBins.map(bin => (
              <tr key={bin.id}>
                <td className="p-2 border-b">{bin.id}</td>
                <td className="p-2 border-b">{bin.location}</td>
                <td className="p-2 border-b">
                  <div className="w-full bg-white/30 rounded-full h-3 mb-1">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        bin.fillLevel > 80
                          ? "bg-red-500"
                          : bin.fillLevel > 50
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${bin.fillLevel}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-700">{Math.round(bin.fillLevel)}%</span>
                </td>
                <td className="p-2 border-b">{getBadge(bin.fillLevel, "fill")}</td>
                <td className="p-2 border-b">{getBadge(bin.aiScore || 0, "ai")}</td>
                <td className="p-2 border-b">
                  <button
                    className="px-3 py-1 bg-lime-500 text-white rounded hover:bg-lime-600 transition"
                    onClick={() => setSelectedBin(bin)}
                  >
                    Audit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manual Audit Slide-over */}
      {selectedBin && (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white/80 backdrop-blur-md border-l border-white/30 shadow-lg p-6 z-50 overflow-y-auto transition-transform">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Manual Audit: {selectedBin.id}</h3>
          <p className="text-gray-600 mb-4">Location: {selectedBin.location}</p>
          <label className="block mb-2 text-gray-700">Notes / Observations</label>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows={6}
            value={manualNotes}
            onChange={e => setManualNotes(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 transition mr-2"
            onClick={() => {
              alert(`Audit submitted for ${selectedBin.id}: ${manualNotes}`);
              setManualNotes("");
              setSelectedBin(null);
            }}
          >
            Submit
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            onClick={() => setSelectedBin(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Audit History Chart */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Audit History (Weekly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={auditData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="audits" stroke="#84cc16" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
