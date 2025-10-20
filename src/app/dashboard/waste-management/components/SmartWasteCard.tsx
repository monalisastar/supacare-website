"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { FaRecycle, FaClipboardCheck, FaExclamationTriangle, FaHourglassHalf } from "react-icons/fa";

interface Bin {
  id: string;
  name: string;
  capacity: number; // kg or liters
  currentFill: number;
  status: "active" | "full" | "maintenance";
  availability: "available-to-rent" | "available-to-buy" | "rented";
  clientId?: string;
  clientName?: string;
  location?: string;
}

interface AuditRequest {
  id: string;
  binId: string;
  binName: string;
  clientId: string;
  clientName: string;
  status: "pending" | "in-progress" | "completed" | "rejected";
  notes?: string;
  createdAt: string;
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SmartWasteCard() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  const { data: bins, error: binsError } = useSWR<Bin[]>(role ? "/api/bins" : null, fetcher);
  const { data: audits, error: auditsError, mutate: mutateAudits } = useSWR<AuditRequest[]>(
    role === "admin"
      ? "/api/audit-requests"
      : role === "client"
      ? `/api/audit-requests?clientId=${userId}`
      : null,
    fetcher
  );

  const [selectedAudit, setSelectedAudit] = useState<AuditRequest | null>(null);
  const [adminNote, setAdminNote] = useState("");

  if (!role) return <p className="text-gray-400">Loading session...</p>;
  if (binsError) return <p className="text-red-400">Failed to load bins.</p>;
  if (!bins) return <p className="text-gray-400">Loading bins...</p>;

  const visibleBins = role === "client" ? bins.filter(bin => bin.clientId === userId) : bins;

  const handleRequestAudit = async (binId: string) => {
    try {
      await fetch("/api/audit-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binId }),
      });
      mutateAudits();
      alert("Audit request submitted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit audit request.");
    }
  };

  const handleAdminAction = async (auditId: string, action: "in-progress" | "completed" | "rejected") => {
    try {
      await fetch(`/api/audit-requests/${auditId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action, notes: adminNote }),
      });
      mutateAudits();
      setSelectedAudit(null);
      setAdminNote("");
      alert(`Audit marked as ${action}.`);
    } catch (err) {
      console.error(err);
      alert("Failed to update audit.");
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        {role === "client" ? "My Bins / Machines" : "All Bins / Machines"}
      </h2>

      {visibleBins.length === 0 ? (
        <p className="text-gray-300 text-sm">
          {role === "client" ? "No bins assigned to you." : "No bins found in system."}
        </p>
      ) : (
        <ul className="space-y-4">
          {visibleBins.map(bin => {
            const fillPercentage = Math.min((bin.currentFill / bin.capacity) * 100, 100);

            const availabilityMap = {
              "available-to-rent": { label: "Available to Rent", color: "bg-green-500/30 text-green-200" },
              "available-to-buy": { label: "Available to Buy", color: "bg-blue-500/30 text-blue-200" },
              rented: { label: "Rented / Out of Stock", color: "bg-red-500/30 text-red-200" },
            };
            const availability = availabilityMap[bin.availability];

            const existingAudit =
              role === "client"
                ? audits?.find(audit => audit.binId === bin.id && audit.status === "pending")
                : null;

            return (
              <li key={bin.id} className="bg-white/5 p-4 rounded-xl flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FaRecycle className="text-green-400" />
                    <span className="text-white font-medium">{bin.name}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        bin.status === "active"
                          ? "bg-green-500/30 text-green-200"
                          : bin.status === "full"
                          ? "bg-red-500/30 text-red-200"
                          : "bg-yellow-500/30 text-yellow-200"
                      }`}
                    >
                      {bin.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${availability.color}`}>
                      {availability.label}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-600/30 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: `${fillPercentage}%` }} />
                </div>

                <p className="text-gray-300 text-xs">
                  {bin.currentFill} / {bin.capacity} kg
                </p>

                {role === "client" && (
                  <button
                    onClick={() => handleRequestAudit(bin.id)}
                    disabled={!!existingAudit}
                    className={`mt-3 px-3 py-2 text-xs font-semibold rounded-xl shadow w-max ${
                      existingAudit ? "bg-gray-500 text-gray-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {existingAudit ? "Audit Requested" : "Request Audit"}
                  </button>
                )}

                {role === "admin" && audits && (
                  <div className="mt-2 space-y-1 text-xs text-gray-300">
                    {audits
                      .filter(audit => audit.binId === bin.id)
                      .map(audit => (
                        <div key={audit.id} className="bg-white/10 p-2 rounded flex justify-between items-center">
                          <span className="font-medium text-sm">{audit.clientName}</span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              audit.status === "pending"
                                ? "bg-yellow-500/30 text-yellow-200"
                                : audit.status === "in-progress"
                                ? "bg-blue-500/30 text-blue-200"
                                : audit.status === "completed"
                                ? "bg-green-500/30 text-green-200"
                                : "bg-red-500/30 text-red-200"
                            }`}
                          >
                            {audit.status.replace("-", " ")}
                          </span>

                          {(audit.status === "pending" || audit.status === "in-progress") && (
                            <div className="flex gap-1">
                              {audit.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => handleAdminAction(audit.id, "in-progress")}
                                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                                  >
                                    Start
                                  </button>
                                  <button
                                    onClick={() => setSelectedAudit(audit)}
                                    className="px-2 py-1 bg-red-600 text-white text-xs rounded"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {audit.status === "in-progress" && (
                                <button
                                  onClick={() => setSelectedAudit(audit)}
                                  className="px-2 py-1 bg-green-600 text-white text-xs rounded"
                                >
                                  Complete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Admin Notes Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96">
            <h3 className="text-white font-semibold mb-2">
              {selectedAudit.status === "pending" ? "Reject Audit" : "Complete Audit"} - {selectedAudit.clientName}
            </h3>
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white text-sm mb-4"
              placeholder="Add notes (optional)"
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedAudit(null)}
                className="px-3 py-1 rounded bg-gray-500 text-white text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleAdminAction(
                    selectedAudit.id,
                    selectedAudit.status === "pending" ? "rejected" : "completed"
                  )
                }
                className="px-3 py-1 rounded bg-green-600 text-white text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
