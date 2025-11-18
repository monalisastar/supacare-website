'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category?: string
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🧠 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) throw new Error('Failed to load product')
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load product details.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Loading product details...
      </div>
    )

  if (error)
    return (
      <p className="text-red-500 text-center mt-10">{error}</p>
    )

  if (!product)
    return (
      <p className="text-gray-500 text-center mt-10">Product not found.</p>
    )

  // 🛒 Add to cart handler
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '', // ✅ Fallback ensures type safety
      quantity: 1,
    })
  }

  return (
    <motion.section
      className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-green-700 hover:text-green-900 mb-6 transition"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Shop
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 shadow-inner">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No image available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
              {product.name}
            </h1>
            {product.category && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Category: {product.category}
              </p>
            )}
            <p className="text-lg font-semibold text-green-700 dark:text-green-300 mt-3">
              KES {product.price.toLocaleString()}
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {product.description || 'No description provided.'}
          </p>

          {/* 🛍️ Buy / Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <Link
              href="/dashboard/client/checkout"
              className="text-center border border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-medium px-6 py-3 rounded-lg transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
