// types.ts
export interface Product {
  id: string;
  title: string;
  name: string;
  price: number;
  description: string;
  image: string;
  mainImage: string;
  category: {
    name: string;
  };
  categoryId: string;
  manufacturer: string;
  inStock: number;  // Changed from boolean to number
  slug: string;
  rating: number;
}
