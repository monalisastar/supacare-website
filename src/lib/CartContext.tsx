'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react'

/** 🛒 Cart item structure */
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

/** 🧠 Context type definition */
interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
}

/** ⚙️ Create context */
const CartContext = createContext<CartContextType | undefined>(undefined)

/** 🌿 Provider */
export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // ♻️ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  // 💾 Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  /** ➕ Add to cart */
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  /** ❌ Remove item */
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  /** 🧹 Clear all */
  const clearCart = () => setCart([])

  /** 🔄 Update quantity */
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart, updateQuantity }),
    [cart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/** ⚡ Hook for components */
export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
