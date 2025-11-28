import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    const parsedProducts = products.map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      sizes: JSON.parse(p.sizes || '[]'),
      colors: JSON.parse(p.colors || '[]'),
    }));
    res.status(200).json(parsedProducts);
  } else if (req.method === 'POST') {
    const { title, slug, description, price, images, sizes, colors, stock } = req.body;
    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price,
        images: JSON.stringify(images || []),
        sizes: JSON.stringify(sizes || []),
        colors: JSON.stringify(colors || []),
        stock,
      },
    });
    res.status(201).json(product);
  } else {
    res.status(405).end();
  }
}
