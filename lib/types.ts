export interface Product {
  id: string;
  name: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number; // Added this field for discount display
  description: string;
  image: string;
  mainImage: string;
  category: {
    name: string;
  };
  categoryId: string;
  manufacturer: string;
  inStock: number;
  rating: number;
}