"use client";

import DashboardLayout from "../../DashboardLayout";
import Card from "../../components/Card";
import { FaRoute, FaTrash, FaCalendarAlt } from "react-icons/fa";

export default function WasteManagementOverviewPage() {
  // Placeholder data
  const stats = [
    { label: "Total Routes", value: 12, icon: <FaRoute className="text-2xl text-lime-400" /> },
    { label: "Total Bins", value: 87, icon: <FaTrash className="text-2xl text-yellow-400" /> },
    { label: "Active Collections", value: 5, icon: <FaCalendarAlt className="text-2xl text-blue-400" /> },
  ];

  const routes = [
    { name: "Route A", frequency: "Daily", status: "Active", staff: "John Doe" },
    { name: "Route B", frequency: "Weekly", status: "Pending", staff: "Jane Smith" },
    { name: "Route C", frequency: "Bi-weekly", status: "Active", staff: "Mike Johnson" },
  ];

  return (
    <DashboardLayout>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-200 mb-6">Waste Management Overview</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4 p-4">
            <div>{stat.icon}</div>
            <div>
              <p className="text-lg font-semibold text-gray-100">{stat.value}</p>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Routes Table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-3">Routes Overview</h2>
        <Card className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-gray-300">
                <th className="px-4 py-2">Route Name</th>
                <th className="px-4 py-2">Frequency</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Assigned Staff</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.name} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-4 py-2">{route.name}</td>
                  <td className="px-4 py-2">{route.frequency}</td>
                  <td className="px-4 py-2">{route.status}</td>
                  <td className="px-4 py-2">{route.staff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-200 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600 text-white">Add Route</button>
          <button className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-white">Manage Bins</button>
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white">Schedule Collection</button>
        </div>
      </section>
    </DashboardLayout>
  );
}
