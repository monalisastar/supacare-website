"use client";

import Link from "next/link";
import { FaDollarSign } from "react-icons/fa";
import Card from "./Card"; // glassmorphism card

interface PaymentsData {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  totalPaid: number; // currency
}

export default function PaymentsCard() {
  // Placeholder data
  const data: PaymentsData = {
    totalInvoices: 10,
    paidInvoices: 7,
    pendingInvoices: 3,
    totalPaid: 2500,
  };

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
          <div className="bg-white/10 p-4 rounded-lg text-center min-w-[120px]">
            <p className="text-2xl font-bold">{data.totalInvoices}</p>
            <p className="text-sm text-gray-300">Total Invoices</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg text-center min-w-[120px]">
            <p className="text-2xl font-bold text-green-400">{data.paidInvoices}</p>
            <p className="text-sm text-gray-300">Paid</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg text-center min-w-[120px]">
            <p className="text-2xl font-bold text-yellow-400">{data.pendingInvoices}</p>
            <p className="text-sm text-gray-300">Pending</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg text-center min-w-[120px]">
            <p className="text-2xl font-bold">${data.totalPaid}</p>
            <p className="text-sm text-gray-300">Total Paid</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
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
