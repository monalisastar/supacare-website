"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Bin {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "Available" | "Rented" | "Out of Stock";
  price?: number;
  description?: string;
}

interface BinRequestData {
  clientName: string;
  address: string;
  quantity: number;
  paymentOption: string;
  instructions?: string;
}

export default function BinDetailPage() {
  const params = useParams();
  const router = useRouter();
  const binId = params.id;

  const [bin, setBin] = useState<Bin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<BinRequestData>({
    clientName: "",
    address: "",
    quantity: 1,
    paymentOption: "Cash",
    instructions: "",
  });

  // Fetch bin details
  useEffect(() => {
    const fetchBin = async () => {
      try {
        const response = await fetch(`/api/waste-collection/bins/${binId}`);
        if (!response.ok) throw new Error("Bin not found");
        const data: Bin = await response.json();
        setBin(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bin details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBin();
  }, [binId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bin) return;

    try {
      const response = await fetch(`/api/waste-collection/bins/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, binId: bin.id }),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError("Request failed. Please try again.");
    }
  };

  if (loading) return <p className="p-6 text-white">Loading bin details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!bin)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bin not found</h1>
        <Link href="/dashboard/waste-collection/bins" className="mt-4 inline-block px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md">
          ← Back to Bins
        </Link>
      </div>
    );

  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen relative">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/dashboard/waste-collection/bins"
          className="inline-block px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md"
        >
          ← Back to Bins
        </Link>
      </div>

      {/* Bin Details */}
      <div className="max-w-3xl mx-auto bg-black/50 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-white">{bin.name}</h1>
        <p className="text-white/80">{bin.description}</p>
        <p className="text-white"><strong>Type:</strong> {bin.type}</p>
        <p className="text-white"><strong>Location:</strong> {bin.location}</p>
        <p className="text-white"><strong>Status:</strong> {bin.status}</p>
        {bin.price && <p className="text-white"><strong>Price:</strong> ${bin.price}</p>}

        {submitted && (
          <div className="p-4 bg-green-600 text-white rounded-md">
            Request submitted successfully!
          </div>
        )}

        {/* Request Button */}
        {bin.status === "Available" && !submitted && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md transition mt-4"
          >
            Request / Checkout
          </button>
        )}

        {bin.status !== "Available" && (
          <p className="text-red-400 mt-4 font-semibold">
            This bin is currently not available.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Request / Checkout Bin</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={1}
                required
                className="p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                name="paymentOption"
                value={formData.paymentOption}
                onChange={handleChange}
                className="p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Mobile Payment">Mobile Payment</option>
              </select>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Special Instructions (Optional)"
                rows={3}
                className="p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md transition mt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
