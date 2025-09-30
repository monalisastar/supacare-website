"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));

    const navbar = document.getElementById("navbar");
    if (navbar) setNavbarHeight(navbar.offsetHeight);
    else setNavbarHeight(80);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const applyPromo = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(subtotal * 0.1);
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-green-200 p-6"
      style={{ paddingTop: navbarHeight + 20 }}
    >
      <div className="max-w-6xl mx-auto p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold mb-6 text-green-900">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-green-900">
            <p className="mb-4">Your cart is empty.</p>
            <Link href="/shop" className="text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-white/20 py-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-green-900">{item.name}</p>
                      <p className="text-green-800">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 bg-white/50 backdrop-blur-sm"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-1/3 bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-900">Summary</h2>
              <div className="flex justify-between mb-2 text-green-800">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-green-800">
                <span>Discount:</span>
                <span>${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-4 text-green-900">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-2 bg-white/50 backdrop-blur-sm text-green-900"
                />
                <button
                  onClick={applyPromo}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full bg-green-600 text-white text-center py-3 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
