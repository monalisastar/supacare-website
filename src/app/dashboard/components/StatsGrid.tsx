"use client";

import Card from "./Card";
import { FaProjectDiagram, FaTrashAlt, FaChartLine, FaRecycle } from "react-icons/fa";

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number;
  trend?: { direction: "up" | "down"; percent: number };
  link?: string;
}

export default function StatsGrid() {
  const stats: Stat[] = [
    {
      title: "Consultancy Projects",
      value: "5 Active",
      icon: <FaProjectDiagram />,
      progress: 40,
      trend: { direction: "up", percent: 10 },
      link: "/dashboard/consultancy/overview",
    },
    {
      title: "Waste Collection",
      value: "12 Active Routes",
      icon: <FaTrashAlt />,
      progress: 60,
      trend: { direction: "up", percent: 15 },
      link: "/dashboard/waste-collection/overview",
    },
    {
      title: "Smart Tracking",
      value: "8 Bins Online",
      icon: <FaChartLine />,
      progress: 50,
      trend: { direction: "down", percent: 5 },
      link: "/dashboard/smart-waste/overview",
    },
    {
      title: "Recycling & Composting",
      value: "3 Tons Recycled",
      icon: <FaRecycle />,
      progress: 30,
      trend: { direction: "up", percent: 20 },
      link: "/dashboard/composting/overview",
    },
  ];

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            progress={stat.progress}
            trend={stat.trend}
            link={stat.link}
          />
        ))}
      </div>
    </div>
  );
}
