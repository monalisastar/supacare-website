"use client";

import { useState } from "react";
import Link from "next/link";
import Calendar from "../../components/Calendar"; // our reusable calendar

interface Schedule {
  id: string;
  routeName: string;
  type: string;
  scheduledDate: string;
  team: string;
  status: "Pending" | "Completed" | "Cancelled";
}

const schedulesData: Schedule[] = [
  { id: "sched-001", routeName: "Eden Court Route", type: "Domestic", scheduledDate: "2025-10-01", team: "Alice, Bob", status: "Pending" },
  { id: "sched-002", routeName: "Riverside School Route", type: "Institutional", scheduledDate: "2025-10-02", team: "Charlie, Dave", status: "Completed" },
  { id: "sched-003", routeName: "Greenfield Commercial Route", type: "Commercial", scheduledDate: "2025-10-03", team: "Eve, Frank", status: "Pending" },
];

type Tab = "All" | "Pending" | "Completed" | "Cancelled";

export default function WasteScheduleCalendarPage() {
  const [schedules, setSchedules] = useState<Schedule[]>(schedulesData);
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filteredSchedules = schedules.filter((sched) => {
    if (activeTab === "All") return true;
    return sched.status === activeTab;
  });

  const tabs: Tab[] = ["All", "Pending", "Completed", "Cancelled"];

  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Waste Collection Schedule</h1>
        <Link
          href="/dashboard/waste-collection/new"
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md"
        >
          + New Schedule
        </Link>
      </div>

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

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
        <Calendar schedules={filteredSchedules} />
      </div>
    </div>
  );
}
