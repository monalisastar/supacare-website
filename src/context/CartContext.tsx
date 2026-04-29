'use client'

// Cart functionality has been removed from this project.
// This stub exists only to satisfy imports in legacy shop pages.

export function useCart() {
  return {
    cart: [],
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    cartCount: 0,
    cartTotal: 0,
    subtotal: 0,
    total: 0,
    itemCount: 0,
  }
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
