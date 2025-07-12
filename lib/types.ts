// export interface Product {
//   id: string;
//   name: string;
//   title: string;
//   slug: string;
//   price: number;
//   originalPrice?: number; // Added this field for discount display
//   description: string;
//   image: string;
//   mainImage: string;
//   category: {
//     name: string;
//   };
//   categoryId: string;
//   manufacturer: string;
//   inStock: number;
//   rating: number;
// }

export interface Product {
  id: string;
  name?: string; // Make optional if you're using title instead
  title: string;
  slug: string;
  price: number;
  originalPrice?: number | null; // Allow both optional and nullable
  description: string;
  image?: string; // Make optional if you're using mainImage instead
  mainImage: string;
  category: {
    id?: string; // Make optional
    name: string;
  };
  categoryId: string;
  manufacturer: string;
  inStock: number;
  rating: number;
}