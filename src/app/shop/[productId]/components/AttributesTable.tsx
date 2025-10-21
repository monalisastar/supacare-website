'use client';

import React from 'react';

interface AttributesTableProps {
  specs?: Record<string, string>;
}

export default function AttributesTable({ specs }: AttributesTableProps) {
  if (!specs || Object.keys(specs).length === 0) {
    return (
      <div className="text-gray-500 italic text-sm p-6 border border-gray-100 rounded-lg bg-gray-50">
        No additional specifications available for this product.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table className="min-w-full text-sm text-gray-700">
        <tbody>
          {Object.entries(specs).map(([key, value], index) => (
            <tr
              key={key}
              className={`border-b ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <td className="p-3 font-medium w-1/3 capitalize border-r border-gray-200">
                {key}
              </td>
              <td className="p-3">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
