"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
};

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/payments/history");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch payment history");
        }

        // ✅ Ensure we set an array, not an object
        setPayments(Array.isArray(data.payments) ? data.payments : []);
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-16 sm:px-6 lg:px-8">
      
      {/* 🔝 Sticky Top Bar */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-xl bg-white/10 border-b border-white/10 z-50 px-4 py-3 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 text-sm sm:text-base hover:text-blue-400 transition"
        >
          <ArrowLeft size={18} />
          <span>Return to Dashboard</span>
        </Link>
        <h1 className="text-sm sm:text-lg font-semibold">Payment History</h1>
      </div>

      <div className="pt-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-6 text-center">Your Payments</h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-400" size={32} />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">{error}</div>
          ) : payments.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No payment records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-300">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">User</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-3 px-4">
                        {new Date(p.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {p.currency} {p.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 capitalize">{p.method}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            p.status === "COMPLETED"
                              ? "bg-green-500/20 text-green-400"
                              : p.status === "PENDING"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {p.user ? (
                          <div>
                            <div>{p.user.name}</div>
                            <div className="text-xs text-gray-400">{p.user.email}</div>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
