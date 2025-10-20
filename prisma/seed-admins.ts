import { prisma } from "../src/lib/prisma"; // relative path
import bcrypt from "bcryptjs";

async function main() {
  const admins = [
    {
      email: "njatabriang48@gmail.com",
      name: "Brian Njata",
      password: "Hustler001@",
    },
    {
      email: "virginia.njata@gmail.com",
      name: "Virginia Njata",
      password: "Othayaboys21@!",
    },
  ];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    await prisma.user.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        email: admin.email,
        name: admin.name,
        passwordHash: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log(`Admin ${admin.email} ensured in DB`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
