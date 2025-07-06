const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const demoCategories = [
  {
    id: "immune-boosters",
    name: "Immune Boosters",
  },
];

const demoProducts = [
  {
    id: "3",
    slug: "dondooil-family-pack",
    title: "DONDOOIL",
    mainImage: "/images/dondooil.jpeg",
    price: 9000,
    originalPrice: 10000,
    description: "Holistic healing organic stem cell dietary supplement, an immune booster that boost the immune system from the myeloid and lymphoid progenitor (bone marrow)",
    manufacturer: "DONDOOIL",
    inStock: 1,
    categoryId: "immune-boosters",
  },
  {
    id: "1",
    slug: "dondooil-100ml",
    title: "DONDOOIL - Family Pack",
    mainImage: "/images/design-2.jpeg",
    price: 35000,
    originalPrice: 40000,
    description: "Holistic healing organic stem cell dietary supplement, an immune booster that boost the immune system from the myeloid and lymphoid progenitor (bone marrow)",
    manufacturer: "DONDOOIL",
    inStock: 1,
    categoryId: "immune-boosters",
  },
  {
    id: "2",
    slug: "dondooil-200ml",
    title: "DONDOOIL - 200ml",
    mainImage: "/images/dosage.png",
    price: 18500,
    originalPrice: 20000,
    description: "Enhanced formula for maximum immunity",
    manufacturer: "DONDOOIL",
    inStock: 1,
    categoryId: "immune-boosters",
  },
  {
    id: "4",
    slug: "dondooil-premium",
    title: "DONDOOIL - Premium",
    mainImage: "/images/product-premium.jpeg",
    price: 25000,
    originalPrice: 30000,
    description: "Premium strength formula",
    manufacturer: "DONDOOIL",
    inStock: 1,
    categoryId: "immune-boosters",
  },
];

async function insertDemoData() {
  try {
    console.log("Inserting demo categories...");
    for (const category of demoCategories) {
      const existingCategory = await prisma.category.findUnique({
        where: { name: category.name },
      });
      if (!existingCategory) {
        await prisma.category.create({ data: category });
      } else {
        console.log(`Category "${category.name}" already exists. Skipping.`);
      }
    }
    console.log("Demo categories inserted successfully!");

    console.log("Inserting demo products...");
    for (const product of demoProducts) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: product,
      });
    }
    console.log("Demo products inserted successfully!");
  } catch (error) {
    console.error("Error inserting demo data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertDemoData();