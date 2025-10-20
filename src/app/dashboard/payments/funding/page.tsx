"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const paymentMethods = [
  {
    id: "stripe",
    name: "Stripe",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path
          d="M32.91 13.45c-1.29-.61-3.74-1.34-6.84-1.34-6.7 0-11.39 3.49-11.39 8.5 0 4.27 3.37 6.66 7.91 7.55l2.6.52c3.08.62 4.12 1.55 4.12 3.04 0 1.97-2.36 3.18-5.64 3.18-2.6 0-5.22-.64-7.33-1.8v5.59c1.98.94 4.69 1.74 7.89 1.74 7.23 0 12.01-3.45 12.01-8.77 0-4.32-3.45-6.79-8.69-7.87l-2.47-.5c-2.88-.58-4.13-1.52-4.13-3.03 0-1.59 1.98-2.95 5.05-2.95 2.58 0 4.8.54 6.33 1.28v-5.14Z"
          fill="#635BFF"
        />
      </svg>
    ),
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <path
          fill="#253B80"
          d="M14.4 36.8h-4L14.4 11.2h9.6c7.2 0 12 4 12 10.4 0 7.2-5.6 10.4-11.2 10.4h-5.6l-2.4 4.8z"
        />
      </svg>
    ),
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: (
      <svg width="40" height="40" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#F7931A" />
        <path
          fill="#FFF"
          d="M21.3 14.3c.4-2.5-1.5-3.8-4-4.7l.8-3.1-2-.5-.8 3c-.5-.1-1-.2-1.5-.3l.8-3.1-2-.5-.8 3.1c-.4-.1-.9-.2-1.3-.3L9 9.4s1.5.3 1.5.3c.8.2.9.7.9 1.1l-2.2 8.9c-.1.2-.4.5-.8.4 0 0-1.5-.3-1.5-.3l-.4 1.6c.4.1.9.2 1.4.3l-.8 3.1 2 .5.8-3.1c.5.1 1 .2 1.5.3l-.8 3.1 2 .5.8-3.1c3.4.6 5.9.3 7-2.7.9-2.5-.1-4-2-5 1-.3 1.7-1.1 1.9-2.4zM17 19.9c-.6 2.5-4.5 1.1-5.8.8l1-4c1.3.3 5.4.8 4.8 3.2zm.6-5.3c-.6 2.2-3.9 1-5 0l.9-3.7c1.1.3 4.7.7 4.1 3.7z"
        />
      </svg>
    ),
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: (
      <Image
        src="/mpesa.svg"
        alt="M-Pesa"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "manual",
    name: "Manual / Bank",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 10L12 3L21 10V12H3V10ZM5 12H7V19H5V12ZM17 12H19V19H17V12ZM9 12H15V19H9V12Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

export default function FundingPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!amount || !selectedMethod) {
      toast.error("Please select a method and enter an amount");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments/funding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          method: selectedMethod,
          description: `Funding via ${selectedMethod}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Funding initiated successfully! ID: ${data?.fundingId || data?.id}`);
      } else {
        toast.error(data.error || "Funding failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
      {/* Sticky Top Navbar */}
      <div className="sticky top-0 z-20 w-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
        >
          <ArrowLeft size={18} />
          <span>Return to Dashboard</span>
        </button>
        <h2 className="text-lg font-semibold">Wallet Funding</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">💰 Fund Your Wallet</h1>
          <p className="text-blue-100 text-center mb-8">
            Choose your preferred method and securely top up your balance.
          </p>

          {/* Payment Methods */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition border ${
                  selectedMethod === method.id
                    ? "border-blue-400 bg-white/20 shadow-lg"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {method.icon}
                <span className="text-sm mt-2 font-medium">{method.name}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-blue-100 mb-1 font-medium">Amount</label>
              <input
                type="number"
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-blue-100 mb-1 font-medium">Currency</label>
              <select
                className="w-full p-2 rounded-lg bg-blue-950 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="KES">KES</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Fund"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
