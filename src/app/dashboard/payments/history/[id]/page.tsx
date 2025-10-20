"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type Payment = {
  id: string;
  amount: number;
  currency: string;
  userId?: string;
  paymentType: string;
  method: string;
  status: string;
  description?: string;
  createdAt: string;
};

export default function PaymentDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPayment = async () => {
      try {
        const res = await fetch(`/api/payments/${id}`);
        const data = await res.json();
        if (res.ok) {
          setPayment(data);
        } else {
          toast.error(data.error || "Payment not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Unexpected error");
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/80">
        Loading payment details...
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/80">
        Payment not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/dashboard-bg.jpg')] bg-cover bg-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-2xl font-semibold text-white mb-4">
          💳 Payment Details
        </h1>

        <div className="space-y-4 text-white/90">
          <Detail label="Payment ID" value={payment.id} />
          <Detail
            label="Amount"
            value={`${payment.amount.toFixed(2)} ${payment.currency}`}
          />
          <Detail
            label="Date"
            value={new Date(payment.createdAt).toLocaleString()}
          />
          <Detail label="Type" value={payment.paymentType} />
          <Detail label="Method" value={payment.method} />
          <Detail
            label="Status"
            value={
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  payment.status === "COMPLETED"
                    ? "bg-green-500/30 text-green-300"
                    : payment.status === "PENDING"
                    ? "bg-yellow-500/30 text-yellow-300"
                    : "bg-red-500/30 text-red-300"
                }`}
              >
                {payment.status}
              </span>
            }
          />
          {payment.description && (
            <Detail label="Description" value={payment.description} />
          )}
          {session?.user?.role === "admin" && (
            <Detail label="User ID" value={payment.userId || "-"} />
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href={`/api/payments/${payment.id}`}
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition"
          >
            View JSON
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <span className="block text-white/60 text-sm">{label}</span>
      <div className="mt-1 text-white">{value}</div>
    </div>
  );
}
