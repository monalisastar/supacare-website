"use client";

import Card from "./Card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { month: "Jan", compost: 200, co2: 15 },
  { month: "Feb", compost: 300, co2: 20 },
  { month: "Mar", compost: 250, co2: 18 },
  { month: "Apr", compost: 400, co2: 22 },
];

export default function StatsGrid() {
  return (
    <Card className="mt-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Analytics Overview</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sampleData}>
          <XAxis dataKey="month" stroke="#ffffffaa" />
          <YAxis stroke="#ffffffaa" />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937" }} />
          <Line type="monotone" dataKey="compost" stroke="#84cc16" strokeWidth={2} />
          <Line type="monotone" dataKey="co2" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
