"use client";

import useSWR from "swr";
import { FaTruck, FaCalendarAlt } from "react-icons/fa";

interface Collection {
  id: string;
  date: string;
  status: "pending" | "on-the-way" | "completed";
  location?: string; // client facing
  route?: string;    // admin facing
  clientName?: string; // admin facing
  driver?: string;   // admin facing
}

interface Props {
  role: "client" | "admin";
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UpcomingCollectionsCard({ role }: Props) {
  // Fetch collections from API
  const { data, error, isLoading } = useSWR<Collection[]>(`/api/collections?role=${role}`, fetcher);

  const collections = data ?? [];

  if (error) {
    return (
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {role === "client" ? "Upcoming Collections" : "Scheduled Collections"}
        </h2>
        <p className="text-red-400 text-sm">Failed to load collections.</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        {role === "client" ? "Upcoming Collections" : "Scheduled Collections"}
      </h2>

      {isLoading ? (
        <p className="text-gray-300 text-sm">Loading collections...</p>
      ) : collections.length === 0 ? (
        <p className="text-gray-300 text-sm">
          {role === "client" ? "No upcoming collections." : "No scheduled collections."}
        </p>
      ) : (
        <ul className="space-y-4">
          {collections.map((col) => (
            <li
              key={col.id}
              className="bg-white/5 p-4 rounded-xl flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-400" />
                  <span className="text-white font-medium">{col.date}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    col.status === "on-the-way"
                      ? "bg-blue-500/30 text-blue-200"
                      : col.status === "completed"
                      ? "bg-green-500/30 text-green-200"
                      : "bg-yellow-500/30 text-yellow-200"
                  }`}
                >
                  {col.status}
                </span>
              </div>

              {role === "client" ? (
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <FaTruck className="text-gray-400" />
                  Location: {col.location ?? "N/A"}
                </p>
              ) : (
                <div className="text-gray-300 text-sm space-y-1">
                  <p>Route: {col.route ?? "N/A"}</p>
                  <p>Client: {col.clientName ?? "N/A"}</p>
                  <p>Driver: {col.driver ?? "Unassigned"}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
