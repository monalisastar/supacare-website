"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import { FaLeaf, FaChartLine } from "react-icons/fa";

interface ClientImpact {
  recycledWaste: number; // kg
  co2Offset: number;     // kg
  waterSaved?: number;   // liters
  monthlyGoal: number;   // kg
}

interface AdminImpact {
  totalRecycled: number;
  totalCO2Offset: number;
  growthPercent: number;
  topClients: { name: string; recycledWaste: number }[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Local Card wrapper
const Card = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      {icon && <div className="text-xl text-white">{icon}</div>}
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

// Mini card for individual metrics
const MetricCard = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
    {children}
  </div>
);

export default function ImpactCard() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const { data, error } = useSWR<ClientImpact | AdminImpact>(
    role ? "/api/impact" : null,
    fetcher
  );

  if (!role) return <p className="text-gray-400">Loading session...</p>;
  if (error) return <p className="text-red-400">Failed to load impact data.</p>;
  if (!data) return <p className="text-gray-400">Loading impact data...</p>;

  return (
    <Card title="Impact Dashboard" icon={<FaLeaf />}>
      {role === "client" ? (
        <div className="space-y-4">
          <MetricCard>
            <div>
              <p className="text-xs text-gray-300">Recycled Waste</p>
              <h3 className="text-lg font-bold text-white">{(data as ClientImpact).recycledWaste} kg</h3>
            </div>
            <FaLeaf className="text-green-400 text-2xl" />
          </MetricCard>

          <MetricCard>
            <div>
              <p className="text-xs text-gray-300">CO₂ Offset</p>
              <h3 className="text-lg font-bold text-white">{(data as ClientImpact).co2Offset} kg</h3>
            </div>
            <FaChartLine className="text-yellow-400 text-2xl" />
          </MetricCard>

          {(data as ClientImpact).waterSaved && (
            <MetricCard>
              <div>
                <p className="text-xs text-gray-300">Water Saved</p>
                <h3 className="text-lg font-bold text-white">{(data as ClientImpact).waterSaved} L</h3>
              </div>
              <FaLeaf className="text-blue-400 text-2xl" />
            </MetricCard>
          )}

          {/* Progress Bar */}
          <div>
            <p className="text-xs text-gray-300">Monthly Goal Progress</p>
            <div className="w-full bg-gray-600/30 rounded-full h-2 mt-1">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    ((data as ClientImpact).recycledWaste /
                      (data as ClientImpact).monthlyGoal) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <button
            className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow hover:opacity-90 transition"
            onClick={() => (window.location.href = "/dashboard/impact/insights")}
          >
            View Insights
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <MetricCard>
            <div>
              <p className="text-xs text-gray-300">Total Recycled</p>
              <h3 className="text-lg font-bold text-white">{(data as AdminImpact).totalRecycled} kg</h3>
            </div>
            <FaLeaf className="text-green-400 text-2xl" />
          </MetricCard>

          <MetricCard>
            <div>
              <p className="text-xs text-gray-300">Total CO₂ Offset</p>
              <h3 className="text-lg font-bold text-white">{(data as AdminImpact).totalCO2Offset} kg</h3>
            </div>
            <FaChartLine className="text-yellow-400 text-2xl" />
          </MetricCard>

          <MetricCard>
            <div>
              <p className="text-xs text-gray-300">Growth vs Last Month</p>
              <h3
                className={`text-lg font-bold ${
                  (data as AdminImpact).growthPercent >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {(data as AdminImpact).growthPercent.toFixed(1)}%
              </h3>
            </div>
            <FaChartLine className="text-white text-2xl" />
          </MetricCard>

          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-xs text-gray-300 mb-2">Top 5 Clients</p>
            <ul className="space-y-1 text-gray-200 text-sm">
              {(data as AdminImpact).topClients.map((c, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{idx + 1}. {c.name}</span>
                  <span className="font-semibold">{c.recycledWaste} kg</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow hover:opacity-90 transition"
            onClick={() => (window.location.href = "/dashboard/admin/impact")}
          >
            View Full Analytics
          </button>
        </div>
      )}
    </Card>
  );
}
