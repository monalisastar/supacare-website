"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaProjectDiagram, FaLeaf, FaClipboardCheck } from "react-icons/fa";
import Card from "./Card"; // glassmorphism card

// Shape of the consultancy overview data
interface OverviewData {
  active: number;
  pending: number;
  completed: number;
  co2Offset: number;
  auditsPending: number;
}

// Default values (all zero) so card always renders
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

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch("/api/consultancy/overview");
        if (!res.ok) throw new Error("Failed to fetch consultancy overview");
        const data = await res.json();
        setOverview(data);
      } catch (err) {
        console.error("Error loading consultancy data:", err);
        // fallback to defaultData (all 0s)
        setOverview(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaProjectDiagram className="text-lime-500 text-2xl" />
        <h3 className="text-xl font-semibold text-gray-100">
          Consultancy Projects
        </h3>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-24 text-gray-400">
          Loading...
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
              <div
                key={metric.label}
                className="bg-white/30 p-3 rounded text-center"
              >
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
      <div className="flex gap-4">
        <Link
          href="/dashboard/consultancy/overview"
          className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
        >
          View Projects
        </Link>
        <Link
          href="/dashboard/consultancy/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          New Project
        </Link>
      </div>
    </Card>
  );
}
