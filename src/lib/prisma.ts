// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Allow global `var` declarations
  // Prevent multiple Prisma instances in dev
  var prisma: PrismaClient | undefined
}

// ✅ Consistent instance (no duplication)
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: ['error', 'warn'], // optional: add 'query' for debugging
  })

// ✅ Cache in global scope (for hot reloads)
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
