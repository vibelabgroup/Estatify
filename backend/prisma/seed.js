const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const defaultAdminEmail = 'nico@estatify.ai';
  const defaultAdminPassword = '3st4t1fy!2026';

  // Check if the default admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: defaultAdminEmail },
  });

  if (!existingAdmin) {
    // Hash the default password
    const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);

    // Create the default admin user
    await prisma.user.create({
      data: {
        email: defaultAdminEmail,
        password: hashedPassword,
        name: 'Nico Admin',
        role: 'ADMIN',
        isActive: true,
      },
    });
    console.log(`Default admin user created: ${defaultAdminEmail}`);
  } else {
    console.log(`Default admin user already exists: ${defaultAdminEmail}`);
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
