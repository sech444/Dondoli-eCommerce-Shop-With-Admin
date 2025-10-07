// In Dondoli-eCommerce-Shop-With-Admin/server/app.js

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");

// --- Routers ---
const productsRouter = require("./routes/products");
const productImagesRouter = require("./routes/productImages");
const categoryRouter = require("./routes/category");
const searchRouter = require("./routes/search");
const mainImageRouter = require("./routes/mainImages");
const userRouter = require("./routes/users");
const slugRouter = require("./routes/slugs");
const orderProductRouter = require('./routes/customer_order_product');
const wishlistRouter = require('./routes/wishlist');
const ordersRouter = require('./routes/orders');
// const statsRouter = require('./routes/stats'); // <-- COMMENTED OUT
// const authRouter = require('./routes/auth');   // <-- COMMENTED OUT

const app = express();

// --- Core Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// --- Production-Ready CORS Configuration ---
const allowedOrigins = [
  'https://www.dondooil.com',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// --- API Routes ---
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/images", productImagesRouter);
app.use("/api/main-image", mainImageRouter);
app.use("/api/users", userRouter);
app.use("/api/search", searchRouter);
app.use('/api/order-product', orderProductRouter);
app.use("/api/slugs", slugRouter);
app.use("/api/wishlist", wishlistRouter);
app.use('/api/orders', ordersRouter);
// app.use('/api/stats', statsRouter); // <-- COMMENTED OUT
// app.use('/api/auth', authRouter);   // <-- COMMENTED OUT

// --- Health Check Endpoint ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- Error Handling Middleware ---
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.method} ${req.originalUrl} not found on this server` 
  });
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// --- Server Start ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;