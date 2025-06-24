// prisma/seed.js  (CommonJS)
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash1 = await bcrypt.hash('owner123', 10);
  await prisma.user.upsert({
    where: { email: 'jamiem99869@outlook.com' },
    create: { email: 'jamiem99869@outlook.com', password: hash1, role: 'OWNER' },
    update: {},
  });

  const hash2 = await bcrypt.hash('super123', 10);
  await prisma.user.upsert({
    where: { email: 'viktor.reznov1000@gmail.com' },
    create: { email: 'viktor.reznov1000@gmail.com', password: hash2, role: 'SUPER_ADMIN' },
    update: {},
  });
}

main()
  .then(() => console.log('🌱  Seed finished'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
