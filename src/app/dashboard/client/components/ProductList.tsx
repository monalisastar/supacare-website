'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category?: string
}

export default function ClientShop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch only a few products for preview
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/products?limit=3')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        setProducts(data.slice(0, 3))
      } catch (err) {
        console.error(err)
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="p-6 bg-white/70 dark:bg-gray-900/50 rounded-2xl shadow-md backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-green-800 dark:text-green-200 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-green-600" />
          Featured Products
        </h2>
        <Link
          href="/dashboard/client/shop"
          className="text-green-700 hover:text-green-900 font-medium text-sm transition"
        >
          View All →
        </Link>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No products available.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
