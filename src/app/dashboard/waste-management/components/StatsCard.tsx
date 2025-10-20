"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import { FaRecycle, FaRoute, FaClipboardCheck, FaUser } from "react-icons/fa";

interface Stats {
  totalBins?: number;
  assignedBins?: number;
  totalRoutes?: number;
  joinedRoutes?: number;
  pendingAudits?: number;
  completedAudits?: number;
  totalClients?: number;
  activeClients?: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Simple Card wrapper
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg">
    <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
    {children}
  </div>
);

export default function StatsCard() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  const { data, error } = useSWR<Stats>(
    role ? `/api/stats?role=${role}&userId=${userId}` : null,
    fetcher
  );

  if (!role) return <p className="text-gray-400">Loading session...</p>;
  if (error) return <p className="text-red-400">Failed to load stats.</p>;
  if (!data) return <p className="text-gray-400">Loading stats...</p>;

  const metrics = role === "admin" ? [
    { label: "Total Bins", value: data.totalBins || 0, icon: <FaRecycle className="text-green-400" /> },
    { label: "Total Routes", value: data.totalRoutes || 0, icon: <FaRoute className="text-blue-400" /> },
    { label: "Pending Audits", value: data.pendingAudits || 0, icon: <FaClipboardCheck className="text-yellow-400" /> },
    { label: "Active Clients", value: data.activeClients || 0, icon: <FaUser className="text-purple-400" /> },
  ] : [
    { label: "My Bins", value: data.assignedBins || 0, icon: <FaRecycle className="text-green-400" /> },
    { label: "Joined Routes", value: data.joinedRoutes || 0, icon: <FaRoute className="text-blue-400" /> },
    { label: "Pending Audits", value: data.pendingAudits || 0, icon: <FaClipboardCheck className="text-yellow-400" /> },
    { label: "Completed Audits", value: data.completedAudits || 0, icon: <FaClipboardCheck className="text-green-400" /> },
  ];

  return (
    <Card title="Overview Stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
            <div className="text-2xl">{m.icon}</div>
            <h3 className="text-xl font-bold text-white">{m.value}</h3>
            <p className="text-gray-400 text-sm">{m.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
