'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cartItems, removeFromCart, subtotal, total } = useCart()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  // 🧠 Mock checkout action
  const handleCheckout = async () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      alert('✅ Order confirmed! (Mock checkout)')
      router.push('/dashboard/client')
    }, 1500)
  }

  return (
    <motion.section
      className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-green-700 hover:text-green-900 mb-6 transition"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Cart
      </button>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
        Checkout
      </h1>

      {/* Empty cart */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          Your cart is empty. Add items before proceeding to checkout.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white/70 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">
              Review Your Order
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-[60px] h-[60px] bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                        No image
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        {item.name}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {item.quantity} × KES {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white/70 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">
                Summary
              </h2>
              <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                <span>Subtotal:</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                <span>Delivery:</span>
                <span>KES 200</span>
              </div>
              <div className="flex justify-between font-bold text-green-700 dark:text-green-300 text-lg border-t border-gray-300 dark:border-gray-700 pt-3">
                <span>Total:</span>
                <span>KES {(total + 200).toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              disabled={processing}
              onClick={handleCheckout}
              className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white ${
                processing
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800 transition'
              }`}
            >
              {processing ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </div>
        </div>
      )}
    </motion.section>
  )
}
