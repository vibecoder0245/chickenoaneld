import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("owner123", 10);
  await prisma.user.upsert({
    where: { email: "jamiem99869@outlook.com" },
    create: { email: "jamiem99869@outlook.com", password: hash, role: "OWNER" },
    update: {},
  });

  const hash2 = await bcrypt.hash("super123", 10);
  await prisma.user.upsert({
    where: { email: "viktor.reznov1000@gmail.com" },
    create: { email: "viktor.reznov1000@gmail.com", password: hash2, role: "SUPER_ADMIN" },
    update: {},
  });
}
main().finally(() => prisma.$disconnect());
