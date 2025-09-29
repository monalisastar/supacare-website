"use client";

import { useState } from "react";
import Link from "next/link";

export interface WasteRouteFormData {
  title: string;
  type: string;
  scheduledDate: string;
  team: string;
  address: string;
  notes?: string;
}

export default function WasteCollectionForm() {
  const [formData, setFormData] = useState<WasteRouteFormData>({
    title: "",
    type: "",
    scheduledDate: "",
    team: "",
    address: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waste-collection/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit route");
      setSubmitted(true);
      setFormData({ title: "", type: "", scheduledDate: "", team: "", address: "", notes: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-green-100 min-h-screen">
      <div className="mb-6">
        <Link
          href="/dashboard/waste-collection/routes"
          className="inline-block px-4 py-2 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-md transition"
        >
          ← Back to Routes
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Submit New Waste Collection Route
      </h1>

      {submitted && (
        <div className="mb-6 p-4 bg-green-700 text-white rounded-md font-medium">
          Route submitted successfully!
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-700 text-white rounded-md font-medium">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-lg border border-gray-300 rounded-xl p-6 flex flex-col gap-4"
      >
        <div>
          <label className="block text-gray-800 font-semibold mb-1">Route Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="E.g., Eden Court Dustbin Route"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-1">Route Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select Type</option>
            <option value="Domestic">Domestic</option>
            <option value="Commercial">Commercial</option>
            <option value="Institutional">Institutional</option>
            <option value="Organic">Organic</option>
            <option value="Hazardous">Hazardous</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-1">Scheduled Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-1">Team Members (comma separated)</label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
            placeholder="Alice, Bob"
            className="w-full p-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-1">Address / Location</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="E.g., Eden Court Estate, Nairobi"
            className="w-full p-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-1">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any special instructions"
            className="w-full p-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-md font-semibold transition mt-4"
        >
          Submit Route
        </button>
      </form>
    </div>
  );
}
