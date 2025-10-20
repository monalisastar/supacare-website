"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import { FaClipboardCheck, FaRecycle, FaRoute, FaMoneyBill } from "react-icons/fa";

interface Action {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
  role: "client" | "admin" | "all";
  apiEndpoint?: string; // optional API for actions like request audit
}

interface AuditRequest {
  id: string;
  binId: string;
  clientId: string;
  status: "pending" | "in-progress" | "completed" | "rejected";
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function QuickActionsCard() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  // Fetch existing audit requests for client
  const { data: audits, mutate } = useSWR<AuditRequest[]>(
    role === "client" ? `/api/audit-requests?clientId=${userId}` : null,
    fetcher
  );

  const [loadingActions, setLoadingActions] = useState<{ [key: string]: boolean }>({});

  if (!role) return <p className="text-gray-400">Loading session...</p>;

  // Handle API-based action click
  const handleApiAction = async (label: string, apiEndpoint?: string) => {
    if (!apiEndpoint) return;

    try {
      setLoadingActions(prev => ({ ...prev, [label]: true }));
      const res = await fetch(apiEndpoint, { method: "POST" });
      if (!res.ok) throw new Error("Request failed");
      mutate(); // refresh audit requests if relevant
      alert(`${label} submitted successfully.`);
    } catch (err) {
      console.error(err);
      alert(`Failed to perform ${label}.`);
    } finally {
      setLoadingActions(prev => ({ ...prev, [label]: false }));
    }
  };

  // Define actions
  const actions: Action[] = [
    {
      label: "Request Audit",
      icon: <FaClipboardCheck />,
      onClick: () => handleApiAction("Request Audit", "/api/audit-requests"),
      role: "client",
      apiEndpoint: "/api/audit-requests"
    },
    {
      label: "Join Route",
      icon: <FaRoute />,
      onClick: () => handleApiAction("Join Route", "/api/routes/join"),
      role: "client",
      apiEndpoint: "/api/routes/join"
    },
    {
      label: "View Payments",
      icon: <FaMoneyBill />,
      onClick: () => window.location.href = "/dashboard/payments",
      role: "client"
    },
    {
      label: "Add Bin / Machine",
      icon: <FaRecycle />,
      onClick: () => window.location.href = "/dashboard/bins/new",
      role: "admin"
    },
    {
      label: "Manage Audits",
      icon: <FaClipboardCheck />,
      onClick: () => window.location.href = "/dashboard/audits",
      role: "admin"
    },
  ];

  // Determine if client has already requested audit
  const clientAuditsPending = audits?.some(a => a.status === "pending") ?? false;

  const visibleActions = actions.filter(a => a.role === role || a.role === "all");

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {visibleActions.map((action, i) => {
          const isDisabled =
            (role === "client" && action.label === "Request Audit" && clientAuditsPending) ||
            loadingActions[action.label];

          return (
            <button
              key={i}
              onClick={action.onClick}
              disabled={isDisabled}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition ${
                isDisabled
                  ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
            >
              <div className="text-2xl">{action.icon}</div>
              <p className="text-white text-sm font-medium">
                {loadingActions[action.label] ? "Processing..." : action.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
