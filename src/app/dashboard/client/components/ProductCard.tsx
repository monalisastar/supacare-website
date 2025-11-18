'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description?: string
    price: number
    image?: string
    category?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl shadow-md bg-white/70 dark:bg-gray-800/60 backdrop-blur-md transition"
    >
      <Link href={`/dashboard/client/shop/${product.id}`}>
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover hover:opacity-90 transition"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {product.description || 'No description available.'}
        </p>
        <p className="text-green-700 dark:text-green-300 font-medium">
          KES {product.price.toLocaleString()}
        </p>
      </div>

      <Link
        href={`/dashboard/client/shop/${product.id}`}
        className="block mt-3 text-center bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition"
      >
        View Details
      </Link>
    </motion.div>
  )
}
