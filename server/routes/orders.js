// Dondoli-eCommerce-Shop-With-Admin/server/routes/orders.js

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orders');

// CORS middleware for this router
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Routes
router.post('/', createOrder);           // POST /api/orders - Create new order
router.get('/', getOrders);              // GET /api/orders - Get all orders (with pagination)
router.get('/:id', getOrderById);        // GET /api/orders/:id - Get single order
router.put('/:id/status', updateOrderStatus); // PUT /api/orders/:id/status - Update order status
router.delete('/:id', deleteOrder);      // DELETE /api/orders/:id - Delete order

module.exports = router;