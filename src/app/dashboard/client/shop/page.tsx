'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Search, Filter } from 'lucide-react'
import ProductCard from '../components/ProductCard'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category?: string
}

export default function ClientShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [error, setError] = useState<string | null>(null)

  // 🔹 Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const query = new URLSearchParams()
        if (category !== 'all') query.append('category', category)
        if (search.trim()) query.append('search', search.trim())

        const res = await fetch(`/api/products?${query.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    // Debounce fetch for better UX
    const delay = setTimeout(fetchProducts, 400)
    return () => clearTimeout(delay)
  }, [search, category])

  // 🧩 Derive available categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(['all'])
    products.forEach((p) => p.category && cats.add(p.category))
    return Array.from(cats)
  }, [products])

  return (
    <section className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen rounded-2xl shadow-sm transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-green-600" />
          Supacare Shop
        </h2>

        {/* 🔍 Search */}
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-full sm:w-1/2 bg-white/70 dark:bg-gray-800/40">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="bg-transparent w-full px-2 focus:outline-none text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* 🧭 Category Filter */}
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200 bg-white/70 dark:bg-gray-800/40"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all'
                  ? 'All Categories'
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 15 },
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
