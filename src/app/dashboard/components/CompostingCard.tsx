'use client'

import Link from "next/link";
import useSWR from "swr";
import { FaRecycle, FaTruck, FaSeedling } from "react-icons/fa";
import Card from "./Card"; // glassmorphism card

interface CompostingData {
  machines: number;
  compostProduced: number; // kg
  sales: number; // currency
  trainingSessions: number;
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CompostingCard() {
  const { data: machinesData } = useSWR('/api/composting/machines', fetcher);
  const { data: salesData } = useSWR('/api/composting/sales', fetcher);
  const { data: trainingData } = useSWR('/api/composting/training', fetcher);
  const { data: agricultureData } = useSWR('/api/composting/agriculture', fetcher);

  // Compose final stats (default to 0 if data not loaded)
  const data: CompostingData = {
    machines: machinesData?.length ?? 0,
    compostProduced: agricultureData?.reduce((sum: number, item: any) => sum + (item.compostProduced ?? 0), 0) ?? 0,
    sales: salesData?.reduce((sum: number, sale: any) => sum + (sale.amount ?? 0), 0) ?? 0,
    trainingSessions: trainingData?.length ?? 0,
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
        <Link
          href="/dashboard/composting/compost"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Order Compost
        </Link>
      </div>
    </Card>
  );
}
