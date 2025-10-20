"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
}

interface ServicesData {
  category: string;
  count: number;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [servicesData, setServicesData] = useState<ServicesData[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  // Mock fetching data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        setRevenueData([
          { month: "Jan", revenue: 1200 },
          { month: "Feb", revenue: 1500 },
          { month: "Mar", revenue: 1100 },
          { month: "Apr", revenue: 1800 },
          { month: "May", revenue: 2200 },
        ]);

        setServicesData([
          { category: "Consultancy", count: 12 },
          { category: "Composting", count: 8 },
          { category: "Waste Management", count: 15 },
          { category: "AI", count: 5 },
        ]);

        setUserStats({
          totalUsers: 120,
          activeUsers: 87,
          newUsers: 15,
        });
      } catch (err) {
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-gray-400">Total Users</span>
          <span className="text-xl font-bold">{userStats?.totalUsers}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-gray-400">Active Users</span>
          <span className="text-xl font-bold">{userStats?.activeUsers}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-gray-400">New Users</span>
          <span className="text-xl font-bold">{userStats?.newUsers}</span>
        </div>
      </div>

      {/* Revenue Line Chart */}
      <div className="bg-gray-800 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#84cc16" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Services Bar Chart */}
      <div className="bg-gray-800 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Services per Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={servicesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="category" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#84cc16" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
