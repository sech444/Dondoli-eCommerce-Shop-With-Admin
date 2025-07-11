// components/AddToCartSingleProductBtn.tsx
import React from "react";
import { Product } from "../lib/types"; // Ensure this path is correct for your Product type

// Define the props interface for AddToCartSingleProductBtn
interface SingleProductBtnProps {
  product: Product; // Use the canonical Product type from lib/types.ts
  quantityCount: number;
}

const AddToCartSingleProductBtn = ({ product, quantityCount }: SingleProductBtnProps) => {
  // Placeholder for actual add-to-cart logic
  // You would typically have state management (e.g., React Context, Zustand)
  // or a server action/API call here to handle adding the product to the cart.

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    // For example:
    console.log(`Adding ${quantityCount} of product: ${product.title} (ID: ${product.id}) to cart.`);
    // You might dispatch an action to a cart context or make an API call
    // addToCart(product, quantityCount);
    alert(`Added ${product.title} to cart! Quantity: ${quantityCount}`); // Use a custom modal in production, not alert()
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
      // You might want to disable the button if product is out of stock
      // disabled={product.inStock <= 0}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartSingleProductBtn;