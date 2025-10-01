"use client";

import Link from "next/link";
import { FaRecycle, FaTruck, FaSeedling } from "react-icons/fa";
import Card from "./Card"; // glassmorphism card

interface CompostingData {
  machines: number;
  compostProduced: number; // kg
  sales: number; // currency
  trainingSessions: number;
}

export default function CompostingCard() {
  // Placeholder data
  const data: CompostingData = {
    machines: 5,
    compostProduced: 1200,
    sales: 450,
    trainingSessions: 3,
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <FaRecycle className="text-lime-400 text-2xl" />
        <h3 className="text-xl font-semibold text-gray-100">Composting Services</h3>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/30 p-3 rounded text-center">
          <p className="text-lg font-bold">{data.machines}</p>
          <p>Machines Deployed</p>
        </div>
        <div className="bg-white/30 p-3 rounded text-center">
          <p className="text-lg font-bold">{data.compostProduced} kg</p>
          <p>Compost Produced</p>
        </div>
        <div className="bg-white/30 p-3 rounded text-center">
          <p className="text-lg font-bold">${data.sales}</p>
          <p>Compost Sales</p>
        </div>
        <div className="bg-white/30 p-3 rounded text-center">
          <p className="text-lg font-bold">{data.trainingSessions}</p>
          <p>Training Delivered</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard/composting/machines"
          className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
        >
          Order Machine
        </Link>
        <Link
          href="/dashboard/composting/training"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Request Training
        </Link>
      </div>
    </Card>
  );
}
