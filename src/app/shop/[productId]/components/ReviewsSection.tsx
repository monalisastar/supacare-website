'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: 'GreenEarth Farms',
    rating: 5,
    comment:
      'Excellent compost quality! Our crop yield improved significantly within weeks. Highly recommend Supacare.',
    date: 'Oct 10, 2025',
  },
  {
    id: 2,
    name: 'EcoGrow Limited',
    rating: 4,
    comment:
      'Reliable supplier. Delivery was on time and packaging was sustainable. Will order again soon.',
    date: 'Sep 29, 2025',
  },
];

export default function ReviewsSection() {
  const averageRating =
    mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length;

  return (
    <section className="mt-12 space-y-8">
      {/* Header */}
      <div className="border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
        <p className="text-sm text-gray-600 mt-1">
          Average Rating:{' '}
          <span className="text-green-700 font-medium">
            {averageRating.toFixed(1)} / 5
          </span>
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{review.name}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Leave a Review (Placeholder) */}
      <div className="mt-10 border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Leave a Review</h3>
        <p className="text-sm text-gray-600 mb-4">
          We value your feedback! You’ll soon be able to share your experience here.
        </p>
        <button className="bg-green-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-green-700 transition">
          Coming Soon
        </button>
      </div>
    </section>
  );
}
