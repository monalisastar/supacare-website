"use client";

import Link from "next/link";
import { FaDollarSign } from "react-icons/fa";
import Card from "./Card";
import { useEffect, useState } from "react";

interface Invoice {
  id: string;
  amount: number;
  status: "PAID" | "PENDING";
  createdAt: string;
}

interface PaymentsData {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  totalPaid: number;
}

export default function PaymentsCard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/payments/invoices", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch invoices (status: ${res.status})`);

      const data = await res.json();
      const invoicesArray: Invoice[] = Array.isArray(data) ? data : data.invoices ?? [];
      setInvoices(invoicesArray);
    } catch (err: any) {
      console.error("Error fetching invoices:", err);
      setError(err.message || "Failed to load invoices");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const summary: PaymentsData = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter((i) => i.status === "PAID").length,
    pendingInvoices: invoices.filter((i) => i.status === "PENDING").length,
    totalPaid: invoices
      .filter((i) => i.status === "PAID")
      .reduce((acc, i) => acc + i.amount, 0),
  };

  if (loading) return <Card>Loading payments...</Card>;
  if (error) return <Card>Error: {error}</Card>;

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaDollarSign className="text-yellow-400 text-2xl" />
        <h3 className="text-xl font-semibold text-gray-100">Payments</h3>
      </div>

      {/* Metrics + Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Metrics section */}
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
          {[
            { label: "Total Invoices", value: summary.totalInvoices },
            { label: "Paid", value: summary.paidInvoices, color: "text-green-400" },
            { label: "Pending", value: summary.pendingInvoices, color: "text-yellow-400" },
            { label: "Total Paid", value: `$${summary.totalPaid}` },
          ].map((metric) => (
            <div
              key={metric.label}
              className="bg-white/10 p-4 rounded-lg text-center min-w-[120px]"
            >
              <p className={`text-2xl font-bold ${metric.color || ""}`}>{metric.value}</p>
              <p className="text-sm text-gray-300">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-col md:flex-row">
          <Link
            href="/dashboard/payments/history"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            View History
          </Link>
          <Link
            href="/dashboard/payments/new"
            className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition"
          >
            Make Payment
          </Link>
        </div>
      </div>
    </Card>
  );
}
