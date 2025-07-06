import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function dropProductTable() {
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "Product" CASCADE;`);
  console.log('Product table dropped.');
}

dropProductTable()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
