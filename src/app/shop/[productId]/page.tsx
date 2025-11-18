'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/lib/CartContext'
import { allProducts } from '@/lib/products'
import ProductGallery from './components/ProductGallery'
import ProductInfo from './components/ProductInfo'
import InquiryPanel from './components/InquiryPanel'
import AttributesTable from './components/AttributesTable'
import PackagingDelivery from './components/PackagingDelivery'
import CustomizationSection from './components/CustomizationSection'
import ReviewsSection from './components/ReviewsSection'
import BuyNowSection from './BuyNowSection'

export default function ProductPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [navbarHeight, setNavbarHeight] = useState(0)

  // 🔹 Detect navbar height dynamically
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>('[data-navbar]')
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight)
      const ro = new ResizeObserver(() => setNavbarHeight(navbar.offsetHeight))
      ro.observe(navbar)
      return () => ro.disconnect()
    }
  }, [])

  const product = allProducts.find((p) => p.id === productId)
  if (!product)
    return <p className="p-8 text-center text-gray-600">Product not found</p>

  // 🛒 Shared Add to Cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity: 1,
    })
  }

  return (
    <main
      className="min-h-screen bg-white px-4 pb-20 sm:px-8 lg:px-16 transition-all"
      style={{ paddingTop: navbarHeight }}
    >
      {/* --- TOP SECTION: Gallery + Info + Inquiry Panel --- */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT COLUMN: Gallery + Info */}
        <div className="flex flex-col gap-8 w-full lg:w-2/3">
          <ProductGallery images={product.images} alt={product.alt} />
          <ProductInfo name={product.name} description={product.description} />
        </div>

        {/* RIGHT COLUMN: Sticky Inquiry Panel */}
        <InquiryPanel
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.images[0]}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* --- BUY NOW SECTION --- */}
      <BuyNowSection
        productName={product.name}
        imageSrc={product.images[0]}
        category={product.category}
        onAddToCart={handleAddToCart}
      />

      {/* --- LOWER DETAILS SECTION --- */}
      <section className="mt-16 space-y-16">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
            Product Specifications
          </h2>
          <AttributesTable specs={product.specs} />
        </div>

        <PackagingDelivery />
        <CustomizationSection />
        <ReviewsSection />
      </section>
    </main>
  )
}
