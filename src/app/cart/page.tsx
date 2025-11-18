'use client'

import { useCart } from '@/lib/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = subtotal > 10000 ? subtotal * 0.05 : 0 // Example 5% discount on large orders
  const total = subtotal - discount

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-green-100 p-10">
        <div className="text-center bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-green-100">
          <h2 className="text-2xl font-semibold text-green-800 mb-3">Your Cart is Empty 🛒</h2>
          <p className="text-gray-600 mb-6">Browse our shop and add some sustainable products!</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-green-200 p-6">
      <div className="max-w-6xl mx-auto p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold mb-6 text-green-900">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🧾 Cart Items */}
          <div className="flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-white/20 py-4"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-green-900">{item.name}</p>
                    <p className="text-green-800">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
            >
              Clear Cart
            </button>
          </div>

          {/* 💰 Cart Summary */}
          <div className="w-full lg:w-1/3 bg-white/40 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Summary</h2>
            <div className="flex justify-between mb-2 text-green-800">
              <span>Subtotal:</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-green-800">
              <span>Discount:</span>
              <span>- KES {discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4 text-green-900 border-t pt-3">
              <span>Total:</span>
              <span>KES {total.toLocaleString()}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
