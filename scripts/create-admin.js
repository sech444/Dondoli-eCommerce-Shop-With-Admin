// In scripts/create-admin.js

require('dotenv').config(); // <-- ADD THIS LINE AT THE VERY TOP

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'info200@dondooil.com';
  const password = 'admin123';

  // This will now find the correct DATABASE_URL from your .env file
  console.log('Attempting to connect to database...');

  const existingAdmin = await prisma.user.findUnique({ where: { email } });
  if (existingAdmin) {
    console.log('Admin user with this email already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Dondooil Admin',
      role: 'admin',
    },
  });

  console.log(`Admin user created successfully with email: ${email}`);
}

main()
  .catch((e) => {
    console.error("Script failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });