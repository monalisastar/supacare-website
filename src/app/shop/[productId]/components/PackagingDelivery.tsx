'use client';

import React from 'react';

export default function PackagingDelivery() {
  return (
    <section className="mt-12 space-y-6">
      {/* Section Header */}
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
        Packaging & Delivery
      </h2>

      {/* Packaging Details */}
      <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Packaging Details</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Neutral or customized carton packaging available.</li>
          <li>Eco-friendly and recyclable packaging materials used.</li>
          <li>Each unit carefully sealed to maintain freshness and quality.</li>
          <li>Standard export carton dimensions: 60cm × 40cm × 45cm.</li>
        </ul>
      </div>

      {/* Delivery Info */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Delivery Information</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p>
              <strong>Lead Time:</strong> 7–15 days after order confirmation.
            </p>
            <p>
              <strong>Shipping Method:</strong> By road or sea (bulk orders).
            </p>
          </div>
          <div>
            <p>
              <strong>Port of Dispatch:</strong> Ruiru, Kenya
            </p>
            <p>
              <strong>Supply Ability:</strong> 2000 units per month.
            </p>
          </div>
        </div>
      </div>

      {/* Trade & Warranty */}
      <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Trade & Warranty</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Trade Terms: EXW, FOB, CIF</li>
          <li>Payment Methods: MPesa, Bank Transfer, USDT</li>
          <li>Warranty: 1-year product quality guarantee</li>
          <li>After-Sales Service: 24/7 customer support and on-site assistance</li>
        </ul>
      </div>
    </section>
  );
}
