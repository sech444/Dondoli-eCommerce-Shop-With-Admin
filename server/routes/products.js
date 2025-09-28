// Dondoli-eCommerce-Shop-With-Admin/server/routes/products.js

const express = require("express");

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
  getProductBySlug,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);

// Route to get product by slug
router.route("/slug/:slug").get(getProductBySlug);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
