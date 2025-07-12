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

// export type Product = {
//   id: string;
//   slug: string;
//   title: string;       // Matches Prisma's 'title' field
//   mainImage: string;   // Matches Prisma's 'mainImage' field
//   price: number;
//   originalPrice: number | null;
//   rating: number;
//   description: string;
//   manufacturer: string;
//   inStock: number;
//   name: string;
//   categoryId: string;
//   category?: {         // Make category optional if it's not always included, or required if it is
//     id: string;
//   };
//   // If you had 'name' and 'image' before, they should be replaced or mapped to 'title' and 'mainImage'
//   // Example: If 'name' in your UI actually refers to 'title' from Prisma,
//   // ensure your Product type uses 'title'.
// };