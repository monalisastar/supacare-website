import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ObjectId } from 'mongodb'

/**
 * 📦 GET /api/products/[id]
 * -----------------------------------------------------
 * Fetch a single product by its MongoDB ObjectId.
 * Mirrors the structure of carbon/[id] for consistency.
 */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // 🧩 Validate ID format
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid product ID format' },
        { status: 400 }
      )
    }

    // 🧠 Fetch product with selected fields
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // 🚫 Not found
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }

    // 🧩 Serialize date fields
    const serialized = {
      ...product,
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }

    // ✅ Success
    return NextResponse.json(serialized, { status: 200 })
  } catch (err) {
    console.error('❌ Error fetching product:', err)
    return NextResponse.json(
      { message: 'Server error — please try again later.' },
      { status: 500 }
    )
  }
}
