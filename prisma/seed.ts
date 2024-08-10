import { PrismaClient } from '@prisma/client';
import {
  collections,
  products,
  locations,
  categories,
  subCategories,
} from '../src/data';

const prisma = new PrismaClient();

async function main() {
  // const createLocations = prisma.location.createMany({
  //   data: locations,
  // });
  // const createCategories = prisma.category.createMany({
  //   data: categories,
  // });
  const createSubCategories = prisma.subCategory.createMany({
    data: subCategories,
  });
  // const createCollections = prisma.collection.createMany({
  //   data: collections,
  // });

  // await prisma.$transaction([createLocations]);
  // await prisma.$transaction([createCategories]);
  await prisma.$transaction([createSubCategories]);
  // await prisma.$transaction([createCollections]);

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
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
