"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import { FaRoute, FaPlus, FaCheck, FaTimes } from "react-icons/fa";

interface Bin {
  id: string;
  name: string;
  clientId?: string;
}

interface Route {
  id: string;
  name: string;
  bins: Bin[];
  status: "active" | "scheduled" | "completed";
}

interface JoinRequest {
  id: string;
  routeId: string;
  binId: string;
  binName: string;
  clientId: string;
  clientName: string;
  status: "pending" | "approved" | "rejected";
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RoutesOverviewCard() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  // Fetch routes
  const { data: routes, error: routesError, mutate: mutateRoutes } = useSWR<Route[]>(role ? "/api/routes" : null, fetcher);

  // Fetch join requests
  const { data: requests, error: requestsError, mutate: mutateRequests } = useSWR<JoinRequest[]>(
    role === "admin" ? "/api/join-requests" : role === "client" ? `/api/join-requests?clientId=${userId}` : null,
    fetcher
  );

  if (!role) return <p className="text-gray-400">Loading session...</p>;
  if (routesError) return <p className="text-red-400">Failed to load routes.</p>;
  if (!routes) return <p className="text-gray-400">Loading routes...</p>;

  // Client action: request to join a route
  const handleJoinRequest = async (routeId: string, binId: string) => {
    try {
      await fetch("/api/join-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routeId, binId }),
      });
      mutateRequests();
      alert("Join request submitted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit join request.");
    }
  };

  // Admin action: approve/reject join request
  const handleAdminAction = async (requestId: string, action: "approved" | "rejected") => {
    try {
      await fetch(`/api/join-requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      mutateRequests();
      alert(`Request ${action}.`);
    } catch (err) {
      console.error(err);
      alert("Failed to update request.");
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Collection Routes</h2>

      {routes.length === 0 ? (
        <p className="text-gray-300 text-sm">No routes found.</p>
      ) : (
        <ul className="space-y-4">
          {routes.map(route => {
            const routeRequests = requests?.filter(r => r.routeId === route.id) || [];

            return (
              <li key={route.id} className="bg-white/5 p-4 rounded-xl flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FaRoute className="text-green-400" />
                    <span className="text-white font-medium">{route.name}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      route.status === "active"
                        ? "bg-green-500/30 text-green-200"
                        : route.status === "scheduled"
                        ? "bg-blue-500/30 text-blue-200"
                        : "bg-gray-500/30 text-gray-200"
                    }`}
                  >
                    {route.status}
                  </span>
                </div>

                {/* Client view: request to join */}
                {role === "client" &&
                  // Find bins eligible for this route
                  route.bins
                    .filter(bin => bin.clientId === userId)
                    .map(bin => {
                      const existingRequest = routeRequests.find(r => r.binId === bin.id);
                      return (
                        <button
                          key={bin.id}
                          onClick={() => handleJoinRequest(route.id, bin.id)}
                          disabled={!!existingRequest}
                          className={`mt-2 px-3 py-2 text-xs font-semibold rounded-xl shadow w-max ${
                            existingRequest
                              ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          {existingRequest
                            ? `Requested (${existingRequest.status})`
                            : `Request to Join (${bin.name})`}
                        </button>
                      );
                    })}

                {/* Admin view: pending requests */}
                {role === "admin" && routeRequests.length > 0 && (
                  <div className="mt-2 space-y-1 text-xs text-gray-300">
                    {routeRequests.map(req => (
                      <div key={req.id} className="bg-white/10 p-2 rounded flex justify-between items-center">
                        <span className="font-medium text-sm">{req.clientName} ({req.binName})</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            req.status === "pending"
                              ? "bg-yellow-500/30 text-yellow-200"
                              : req.status === "approved"
                              ? "bg-green-500/30 text-green-200"
                              : "bg-red-500/30 text-red-200"
                          }`}
                        >
                          {req.status}
                        </span>
                        {req.status === "pending" && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleAdminAction(req.id, "approved")}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAdminAction(req.id, "rejected")}
                              className="px-2 py-1 bg-red-600 text-white text-xs rounded"
                            >
                              Reject
                            </button>
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
    </div>
  );
}
