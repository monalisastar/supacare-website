"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import { FaCreditCard, FaMoneyBill, FaExclamationTriangle, FaHistory } from "react-icons/fa";

interface ClientPayment {
  id: string;
  subscription: string;
  lastPayment: string;
  nextDue: string;
  status: "active" | "overdue";
}

interface AdminPaymentStat {
  totalRevenue: number;
  activeSubs: number;
  overdueCount: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Local Card wrapper
const Card = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      {icon && <div className="text-xl text-white">{icon}</div>}
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

// Mini card for each metric
const MetricCard = ({ children, status }: { children: React.ReactNode; status?: "active" | "overdue" }) => {
  const baseClass = "p-3 rounded-xl border shadow flex flex-col items-start justify-center gap-1";
  const statusClass =
    status === "active"
      ? "bg-green-500/10 border-green-500/30"
      : status === "overdue"
      ? "bg-red-500/10 border-red-500/30"
      : "bg-white/5 border-white/10";
  return <div className={`${baseClass} ${statusClass}`}>{children}</div>;
};

export default function PaymentsCard() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const apiUrl = role === "client" || role === "admin" ? "/api/payments" : null;
  const { data, error } = useSWR<ClientPayment[] | AdminPaymentStat>(apiUrl, fetcher);

  const handlePayment = (subscriptionId: string) => {
    window.location.href = `/api/payments/checkout?subId=${subscriptionId}`;
  };

  const handleViewHistory = () => {
    window.location.href = "/dashboard/payments/history";
  };

  if (!role) return null;

  return (
    <Card title="Payments & Subscriptions" icon={<FaCreditCard />}>
      {role === "client" ? (
        <div className="space-y-3">
          {error && <p className="text-red-400">Failed to load payments.</p>}
          {!data ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            (data as ClientPayment[]).map(p => (
              <MetricCard key={p.id} status={p.status}>
                <h4 className="font-semibold">{p.subscription}</h4>
                <p className="text-sm text-gray-300">Last Payment: {p.lastPayment}</p>
                <p className="text-sm text-gray-300">Next Due: {p.nextDue}</p>
                <span
                  className={`inline-flex items-center mt-2 text-xs font-medium ${
                    p.status === "active" ? "text-green-400" : "text-red-400 flex items-center gap-1"
                  }`}
                >
                  {p.status === "active" ? <><FaMoneyBill /> Active</> : <><FaExclamationTriangle /> Overdue</>}
                </span>
                {p.status === "overdue" && (
                  <button
                    onClick={() => handlePayment(p.id)}
                    className="mt-3 px-3 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-white text-xs font-semibold rounded-xl shadow hover:opacity-90 transition"
                  >
                    Make Payment
                  </button>
                )}
              </MetricCard>
            ))
          )}
          <button
            onClick={handleViewHistory}
            className="w-full mt-4 px-4 py-2 bg-white/10 text-gray-200 text-sm font-medium rounded-xl shadow hover:bg-white/20 transition flex items-center justify-center gap-2"
          >
            <FaHistory /> View Payment History
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 text-center">
          {error && <p className="col-span-3 text-red-400">Failed to load stats.</p>}
          {!data ? (
            <p className="col-span-3 text-gray-400">Loading...</p>
          ) : (
            <>
              <MetricCard>
                <h3 className="text-xl font-bold">
                  ${(data as AdminPaymentStat).totalRevenue.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-400">Total Revenue</p>
              </MetricCard>
              <MetricCard>
                <h3 className="text-xl font-bold">{(data as AdminPaymentStat).activeSubs}</h3>
                <p className="text-sm text-gray-400">Active Subs</p>
              </MetricCard>
              <MetricCard status="overdue">
                <h3 className="text-xl font-bold text-red-400">{(data as AdminPaymentStat).overdueCount}</h3>
                <p className="text-sm text-gray-400">Overdue</p>
              </MetricCard>
            </>
          )}
        </div>
      )}
    </Card>
  );
}
