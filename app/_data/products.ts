// app/_data/products.ts
export const  staticProducts = [


  {
    id: "3",
    name: "DONDOOIL ",
    title: "DONDOOIL",
    slug: "dondooil-family-pack",
    price: 9000,
    originalPrice: 10000,
    description: "Holistic healing organic stem cell dietary supplement, an immune booster that boost the immune system from the myeloid and lymphoid progenitor (bone marrow)",
    image: "/images/dondooil.jpeg",
    mainImage: "/images/dondooil.jpeg",
    category: { name: "Immune Boosters" },
    categoryId: "immune-boosters",
    manufacturer: "DONDOOIL",
    inStock: 1,
    rating: 5,
  },
    {
      id: "1",
      name: "DONDOOIL - Family Pack",
      title: "DONDOOIL - Family Pack",
      slug: "dondooil-100ml",
      price: 35000,
      originalPrice: 40000, // Original price before discount
      description: "Holistic healing organic stem cell dietary supplement, an immune booster that boost the immune system from the myeloid and lymphoid progenitor (bone marrow)",
      image: "/images/design-2.jpeg",
      mainImage: "/images/design-2.jpeg",
      category: { name: "Immune Boosters" },
      categoryId: "immune-boosters",
      manufacturer: "DONDOOIL",
      inStock: 1,
      rating: 5,
    },
    {
      id: "2",
      name: "DONDOOIL - 200ml",
      title: "DONDOOIL - 200ml",
      slug: "dondooil-200ml",
      price: 18500,
      originalPrice: 20000,
      description: "Enhanced formula for maximum immunity",
      image: "/images/dosage.png",
      mainImage: "/images/dosage.png",
      category: { name: "Immune Boosters" },
      categoryId: "immune-boosters",
      manufacturer: "DONDOOIL",
      inStock: 1,
      rating: 4,
    },
    
    {
      id: "4",
      name: "DONDOOIL - Premium",
      title: "DONDOOIL - Premium",
      slug: "dondooil-premium",
      price: 25000,
      originalPrice: 30000,
      description: "Premium strength formula",
      image: "/images/product-premium.jpeg",
      mainImage: "/images/product-premium.jpeg",
      category: { name: "Immune Boosters" },
      categoryId: "immune-boosters",
      manufacturer: "DONDOOIL",
      inStock: 1,
      rating: 5,
    },
   ];
  
  export function getProductBySlug(slug: string) {
    return staticProducts.find(p => p.slug === slug);
  }
