const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = "muhimpunduan@gmail.com";
  const password = "AdminPassword123";  
  const hashedPassword = await bcrypt.hash(password, 10);

  
  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: "Super",
        lastName: "Admin",
        isVerified: true,
        role: "ADMIN",
      },
    });
    console.log("Admin user created:", admin);
  } else {
    console.log("Admin user already exists");
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
