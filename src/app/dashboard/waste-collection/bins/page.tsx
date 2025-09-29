"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";

interface Bin {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "Available" | "Rented" | "Out of Stock";
  price?: number; // optional for buy/rent
  canRent?: boolean; // true if available to rent
  canBuy?: boolean; // true if available to buy
}

// Sample bins data
const binsData: Bin[] = [
  { id: "bin-001", name: "Eden Court Smart Bin", type: "Domestic", location: "Eden Court Estate", status: "Available", price: 200, canRent: true, canBuy: true },
  { id: "bin-002", name: "Riverside School Bin", type: "Institutional", location: "Riverside School", status: "Rented", price: 350, canRent: false, canBuy: false },
  { id: "bin-003", name: "Greenfield Commercial Bin", type: "Commercial", location: "Greenfield Estate", status: "Available", price: 500, canRent: true, canBuy: true },
  { id: "bin-004", name: "Hilltop Organic Bin", type: "Organic", location: "Hilltop Estate", status: "Out of Stock", price: 300, canRent: false, canBuy: false },
];

type Tab = "All" | "Available to Rent" | "Available to Buy" | "Rented / Out of Stock";

export default function ClientBinsPage() {
  const [bins, setBins] = useState<Bin[]>(binsData);
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filteredBins = bins.filter((bin) => {
    switch (activeTab) {
      case "Available to Rent":
        return bin.canRent;
      case "Available to Buy":
        return bin.canBuy;
      case "Rented / Out of Stock":
        return bin.status === "Rented" || bin.status === "Out of Stock";
      default:
        return true;
    }
  });

  const tabs: Tab[] = ["All", "Available to Rent", "Available to Buy", "Rented / Out of Stock"];

  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Smart Bins Marketplace</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              activeTab === tab
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-300 text-gray-800 hover:bg-green-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBins.map((bin) => (
          <div key={bin.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 border border-gray-200">
            {/* Bin Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{bin.name}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  bin.status === "Available"
                    ? "bg-green-600 text-white"
                    : bin.status === "Rented"
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-500 text-white"
                }`}
              >
                {bin.status}
              </span>
            </div>

            {/* Bin Info */}
            <p className="text-gray-700">{bin.type} bin at {bin.location}</p>
            {bin.price && <p className="text-gray-900 font-semibold">${bin.price}</p>}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              {bin.canRent && (
                <Link
                  href={`/dashboard/waste-collection/bins/${bin.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-center transition"
                >
                  Rent
                </Link>
              )}
              {bin.canBuy && (
                <Link
                  href={`/dashboard/waste-collection/bins/${bin.id}`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-center transition"
                >
                  Buy
                </Link>
              )}
              {!bin.canRent && !bin.canBuy && (
                <span className="flex-1 text-center text-gray-500 px-2 py-2 rounded-md border border-gray-300">Not Available</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
