// prisma/seed-products.ts
import { PrismaClient } from "@prisma/client"
import { compostProducts } from "../src/lib/products/compost"
import { supportProducts } from "../src/lib/products/support"
import { hardwareProducts } from "../src/lib/products/hardware"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting product seeding...")

  const allProducts = [
    ...compostProducts,
    ...supportProducts,
    ...hardwareProducts,
  ]

  for (const product of allProducts) {
    // Check if it already exists by name
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    })

    if (existing) {
      console.log(`⚠️ Skipped existing: ${product.name}`)
      continue
    }

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description || null,
        price: product.price,
        image: product.images?.[0] || null,
        category: product.category || "General",
        stock: 10, // default for now
        externalUrl: null,
        specs: product.specs ? product.specs : null, // 🆕 include specs JSON
      },
    })

    console.log(`✅ Created: ${product.name}`)
  }

  console.log("🎉 Product seeding complete!")
}

main()
  .catch((err) => {
    console.error("❌ Seed error:", err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
