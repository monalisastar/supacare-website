import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
/**
 * 📦 GET /api/products
 * -----------------------------------------------------
 * Supports query params:
 *  - ?limit=3          → limit results
 *  - ?category=Compost → filter by category
 *  - ?search=keyword   → search by name or description
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limitParam = searchParams.get('limit')

    // 🔹 Safe numeric parsing for limit
    const limit = limitParam
      ? Math.max(1, Math.min(parseInt(limitParam, 10), 50))
      : undefined

    // 🧠 Build dynamic filters safely
    const whereClause: any = {
      AND: [
        category
          ? { category: { equals: category, mode: 'insensitive' as const } }
          : {},
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { description: { contains: search, mode: 'insensitive' as const } },
              ],
            }
          : {},
      ],
    }

    // 📥 Fetch products
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
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

    // 🧩 Serialize date fields
    const serialized = products.map((p) => ({
      ...p,
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
    }))

    // ✅ Success
    return NextResponse.json(serialized, { status: 200 })
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    return NextResponse.json(
      { message: 'Server error — failed to load products.' },
      { status: 500 }
    )
  }
}
