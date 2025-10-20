"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

type Invoice = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "PAID" | "CANCELLED";
  description?: string;
  createdAt: string;
  dueDate?: string;
};

export default function InvoicesPage() {
  const { data: session } = useSession();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch("/api/payments/invoices");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load invoices");
        }

        // ✅ Handle both array and wrapped object
        setInvoices(Array.isArray(data) ? data : Array.isArray(data.invoices) ? data.invoices : []);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        toast.error(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
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
        <div className="flex items-center gap-3">
          <h1 className="text-sm sm:text-lg font-semibold">🧾 Invoices</h1>
          {session?.user?.role === "admin" && (
            <Link
              href="/dashboard/payments/invoices/new"
              className="bg-blue-500/30 hover:bg-blue-500/50 text-white px-4 py-1.5 rounded-xl text-sm transition"
            >
              + New
            </Link>
          )}
        </div>
      </div>

      <div className="pt-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl p-6"
        >
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-400" size={32} />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">{error}</div>
          ) : invoices.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No invoices found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-300">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Currency</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Created</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, index) => (
                    <tr
                      key={inv.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-semibold">
                        {inv.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">{inv.currency}</td>
                      <td className="px-4 py-3">{inv.description || "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            inv.status === "PAID"
                              ? "bg-green-500/20 text-green-400"
                              : inv.status === "PENDING"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {new Date(inv.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/dashboard/payments/invoices/${inv.id}`}
                          className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 px-3 py-1 rounded-xl text-xs font-medium transition"
                        >
                          View
                        </Link>
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
