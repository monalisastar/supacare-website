import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const password = await bcrypt.hash('Supacare123', 10)

  await prisma.user.upsert({
    where: { email: 'client@supacare.com' },
    update: {},
    create: {
      name: 'Test Client',
      email: 'client@supacare.com',
      passwordHash: password, // ✅ fixed field
      role: 'CLIENT',
    },
  })

  await prisma.user.upsert({
    where: { email: 'consultant@supacare.com' },
    update: {},
    create: {
      name: 'Test Consultant',
      email: 'consultant@supacare.com',
      passwordHash: password,
      role: 'CONSULTANT',
    },
  })

  await prisma.user.upsert({
    where: { email: 'admin@supacare.com' },
    update: {},
    create: {
      name: 'Supacare Admin',
      email: 'admin@supacare.com',
      passwordHash: password,
      role: 'ADMIN',
    },
  })

  await prisma.user.upsert({
    where: { email: 'partner@supacare.com' },
    update: {},
    create: {
      name: 'Supacare Partner',
      email: 'partner@supacare.com',
      passwordHash: password,
      role: 'PARTNER',
    },
  })
}

main()
  .then(() => console.log('✅ Seeded users successfully'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
