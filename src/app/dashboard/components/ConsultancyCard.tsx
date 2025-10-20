"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaProjectDiagram, FaLeaf, FaClipboardCheck } from "react-icons/fa";
import Card from "./Card";

interface OverviewData {
  active: number;
  pending: number;
  completed: number;
  co2Offset: number;
  auditsPending: number;
}

const defaultData: OverviewData = {
  active: 0,
  pending: 0,
  completed: 0,
  co2Offset: 0,
  auditsPending: 0,
};

export default function ConsultancyCard() {
  const [overview, setOverview] = useState<OverviewData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch consultancy overview
  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/consultancy/overview", { cache: "no-store" });
      if (!res.ok) throw new Error(`Status ${res.status}: Failed to fetch consultancy overview`);

      const data: OverviewData = await res.json();
      setOverview(data);
    } catch (err: any) {
      console.error("Error loading consultancy data:", err);
      setError(err.message || "Failed to load consultancy overview");
      setOverview(defaultData);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + polling every 30 seconds
  useEffect(() => {
    fetchOverview();
    const interval = setInterval(fetchOverview, 30000); // 30s polling
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaProjectDiagram className="text-lime-500 text-2xl" />
        <h3 className="text-xl font-semibold text-gray-100">Consultancy Projects</h3>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-24 text-gray-400">
          Loading...
        </div>
      ) : error ? (
        <div className="text-red-400 text-center h-24 flex items-center justify-center">
          {error}
        </div>
      ) : (
        <>
          {/* Project Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Active", value: overview.active },
              { label: "Pending", value: overview.pending },
              { label: "Completed", value: overview.completed },
            ].map((metric) => (
              <div key={metric.label} className="bg-white/30 p-3 rounded text-center">
                <p className="text-lg font-bold">{metric.value}</p>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>

          {/* CO₂ Offset */}
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-green-400" />
            <p>
              <strong>CO₂ Offset:</strong> {overview.co2Offset} tons
            </p>
          </div>

          {/* Audits */}
          <div className="flex items-center gap-2 mb-4">
            <FaClipboardCheck className="text-blue-400" />
            <p>
              <strong>Audits Pending:</strong> {overview.auditsPending}
            </p>
          </div>
        </>
      )}

      {/* Quick Actions */}
      <div className="flex gap-4 flex-col md:flex-row">
        <Link
          href="/dashboard/consultancy/overview"
          className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 transition"
        >
          View Projects
        </Link>
        <Link
          href="/dashboard/consultancy/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          New Project
        </Link>
      </div>
    </Card>
  );
}
