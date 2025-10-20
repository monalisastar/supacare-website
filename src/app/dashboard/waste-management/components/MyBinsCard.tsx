"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import { FaRecycle } from "react-icons/fa";
import { useState, useMemo } from "react";

interface Bin {
  id: string;
  name: string;
  capacity: number;
  currentFill: number;
  status: "active" | "full" | "maintenance";
  availability: "available-to-rent" | "available-to-buy" | "rented";
  clientName?: string;
  clientId?: string;
  location?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function MyBinsCard() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  const { data: bins, error } = useSWR<Bin[]>(role ? "/api/bins" : null, fetcher);

  const [filterStatus, setFilterStatus] = useState<Bin["status"] | "all">("all");
  const [filterAvailability, setFilterAvailability] = useState<Bin["availability"] | "all">("all");
  const [sortOption, setSortOption] = useState<"fillAsc" | "fillDesc" | "nameAsc" | "nameDesc">("nameAsc");

  if (!role) return <p className="text-gray-400">Loading session...</p>;
  if (error) return <p className="text-red-400">Failed to load bins.</p>;
  if (!bins) return <p className="text-gray-400">Loading bins...</p>;

  const visibleBins =
    role === "client"
      ? bins.filter(bin => bin.clientId === userId)
      : bins;

  // Apply filters and sorting
  const filteredBins = useMemo(() => {
    let result = [...visibleBins];

    if (filterStatus !== "all") {
      result = result.filter(bin => bin.status === filterStatus);
    }
    if (filterAvailability !== "all") {
      result = result.filter(bin => bin.availability === filterAvailability);
    }

    switch (sortOption) {
      case "fillAsc":
        result.sort((a, b) => a.currentFill / a.capacity - b.currentFill / b.capacity);
        break;
      case "fillDesc":
        result.sort((a, b) => b.currentFill / b.capacity - a.currentFill / a.capacity);
        break;
      case "nameAsc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [visibleBins, filterStatus, filterAvailability, sortOption]);

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        {role === "client" ? "My Bins / Machines" : "All Bins / Machines"}
      </h2>

      {/* Filters & Sorting */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm">
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as Bin["status"] | "all")}
          className="bg-white/10 text-white px-3 py-1 rounded-xl"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="full">Full</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <select
          value={filterAvailability}
          onChange={e => setFilterAvailability(e.target.value as Bin["availability"] | "all")}
          className="bg-white/10 text-white px-3 py-1 rounded-xl"
        >
          <option value="all">All Availability</option>
          <option value="available-to-rent">Available to Rent</option>
          <option value="available-to-buy">Available to Buy</option>
          <option value="rented">Rented / Out of Stock</option>
        </select>

        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value as any)}
          className="bg-white/10 text-white px-3 py-1 rounded-xl"
        >
          <option value="nameAsc">Name A → Z</option>
          <option value="nameDesc">Name Z → A</option>
          <option value="fillAsc">Fill ↑</option>
          <option value="fillDesc">Fill ↓</option>
        </select>
      </div>

      {filteredBins.length === 0 ? (
        <p className="text-gray-300 text-sm">
          {role === "client"
            ? "No bins match your filters."
            : "No bins found in system with these filters."}
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredBins.map(bin => {
            const fillPercentage = Math.min((bin.currentFill / bin.capacity) * 100, 100);

            const availabilityMap = {
              "available-to-rent": { label: "Available to Rent", color: "bg-green-500/30 text-green-200" },
              "available-to-buy": { label: "Available to Buy", color: "bg-blue-500/30 text-blue-200" },
              rented: { label: "Rented / Out of Stock", color: "bg-red-500/30 text-red-200" },
            };
            const availability = availabilityMap[bin.availability];

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

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${availability.color}`}
                    >
                      {availability.label}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-600/30 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>

                <p className="text-gray-300 text-xs">
                  {bin.currentFill} / {bin.capacity} kg
                </p>

                {role === "admin" && (
                  <div className="text-gray-400 text-xs space-y-1">
                    <p>Client: {bin.clientName || "Unassigned"}</p>
                    {bin.location && <p>Location: {bin.location}</p>}
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
