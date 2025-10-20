"use client";

import { FaShoppingCart, FaTruck, FaLeaf } from "react-icons/fa";
import useSWR from "swr";

interface Order {
  id: string;
  type: "pickup" | "compost" | "other";
  date: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  amount?: number; 
  clientName?: string; // admin only
  assignedStaff?: string; // admin only
}

interface Props {
  role: "client" | "admin";
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function OrdersCard({ role }: Props) {
  const { data, error, isLoading } = useSWR<Order[]>(`/api/orders?role=${role}`, fetcher);

  const orders = data ?? [];

  const iconMap = {
    pickup: <FaTruck className="text-blue-400" />,
    compost: <FaLeaf className="text-green-400" />,
    other: <FaShoppingCart className="text-yellow-400" />,
  };

  if (error) {
    return (
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {role === "client" ? "My Orders & Services" : "All Orders"}
        </h2>
        <p className="text-red-400 text-sm">Failed to load orders.</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        {role === "client" ? "My Orders & Services" : "All Orders"}
      </h2>

      {isLoading ? (
        <p className="text-gray-300 text-sm">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-300 text-sm">
          {role === "client" ? "You have no recent orders." : "No orders in the system."}
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white/5 p-4 rounded-xl flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {iconMap[order.type]}
                  <span className="text-white font-medium capitalize">{order.type}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "completed"
                      ? "bg-green-500/30 text-green-200"
                      : order.status === "in-progress"
                      ? "bg-blue-500/30 text-blue-200"
                      : order.status === "pending"
                      ? "bg-yellow-500/30 text-yellow-200"
                      : "bg-red-500/30 text-red-200"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-300 text-xs">Date: {order.date}</p>

              {order.amount !== undefined && (
                <p className="text-gray-300 text-xs">Amount: ${order.amount}</p>
              )}

              {role === "admin" && (
                <div className="text-gray-400 text-xs space-y-1">
                  <p>Client: {order.clientName || "Unknown"}</p>
                  {order.assignedStaff && <p>Staff: {order.assignedStaff}</p>}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
