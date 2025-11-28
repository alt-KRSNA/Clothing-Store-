const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@store.test',
      password: hashedPassword,
      isAdmin: true,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        title: 'Classic White Tee',
        slug: 'classic-white-tee',
        description: 'Comfortable white t-shirt',
        price: 799,
        images: JSON.stringify(['/placeholder.png']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        colors: JSON.stringify(['white']),
        stock: 50,
      },
      {
        title: 'Red Hoodie',
        slug: 'red-hoodie',
        description: 'Warm and stylish hoodie',
        price: 1999,
        images: JSON.stringify(['/placeholder.png']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
        colors: JSON.stringify(['red']),
        stock: 30,
      },
      {
        title: 'Black Jeans',
        slug: 'black-jeans',
        description: 'Classic black denim jeans',
        price: 2499,
        images: JSON.stringify(['/placeholder.png']),
        sizes: JSON.stringify(['28', '30', '32', '34', '36']),
        colors: JSON.stringify(['black']),
        stock: 25,
      },
      {
        title: 'Blue Denim Jacket',
        slug: 'blue-denim-jacket',
        description: 'Stylish blue denim jacket',
        price: 2999,
        images: JSON.stringify(['/placeholder.png']),
        sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
        colors: JSON.stringify(['blue']),
        stock: 15,
      },
    ],
  });

  console.log('Seed finished.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
