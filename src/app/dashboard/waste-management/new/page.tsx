"use client";

import WasteCollectionForm from "../../components/WasteCollectionForm";

export default function NewWasteCollectionPage() {
  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Waste Collection Route
        </h1>
      </div>

      {/* Waste Collection Form */}
      <WasteCollectionForm />
    </div>
  );
}
