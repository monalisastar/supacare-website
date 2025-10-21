'use client';

import React from 'react';

export default function CustomizationSection() {
  return (
    <section className="mt-12 space-y-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
        Customization Services
      </h2>

      {/* Intro */}
      <p className="text-gray-700 text-sm leading-relaxed">
        Supacare provides a variety of customization options to help you meet
        specific project needs or brand requirements. Whether you need branded
        packaging, logo placement, or unique material colors — our team ensures
        that your order reflects your identity.
      </p>

      {/* Customization Types */}
      <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Available Customization Types</h3>

        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          {/* Logo Customization */}
          <div className="space-y-2">
            <p className="font-medium text-gray-900">1. Logo Customization</p>
            <ul className="list-disc list-inside space-y-1">
              <li>MOQ: 300 pieces</li>
              <li>Print or emboss company logo on packaging or product body.</li>
            </ul>
          </div>

          {/* Packaging Customization */}
          <div className="space-y-2">
            <p className="font-medium text-gray-900">2. Packaging Customization</p>
            <ul className="list-disc list-inside space-y-1">
              <li>MOQ: 200 pieces</li>
              <li>Customized eco-friendly packaging with branded labels or colors.</li>
            </ul>
          </div>

          {/* Graphic Customization */}
          <div className="space-y-2">
            <p className="font-medium text-gray-900">3. Graphic Customization</p>
            <ul className="list-disc list-inside space-y-1">
              <li>MOQ: 500 pieces</li>
              <li>Tailored visual design for campaigns, resellers, or partnerships.</li>
            </ul>
          </div>

          {/* Size/Color Customization */}
          <div className="space-y-2">
            <p className="font-medium text-gray-900">4. Size or Color Customization</p>
            <ul className="list-disc list-inside space-y-1">
              <li>MOQ: 100 pieces</li>
              <li>Available on request — based on current production capacity.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="text-gray-700 text-sm bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <p className="mb-2">
          <strong>Lead Time:</strong> Custom orders may require 7–10 extra working days.
        </p>
        <p>
          <strong>Design Assistance:</strong> Our creative team can help refine your
          logo or packaging design before production begins.
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-3">
        <button className="bg-green-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-green-700 transition">
          Request Customization
        </button>
      </div>
    </section>
  );
}
