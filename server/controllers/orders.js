// Dondoli-eCommerce-Shop-With-Admin/server/controllers/orders.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      whatsappNumber,
      state,
      deliveryAddress,
      package: pkg,
      concerns = [],
    } = req.body;

    // Validation
    if (!fullName || !phoneNumber || !state || !deliveryAddress || !pkg) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fullName, phoneNumber, state, deliveryAddress, package'
      });
    }

    // Get client IP and User Agent
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.headers['x-real-ip'] || 
               req.connection?.remoteAddress || 
               req.ip || 
               null;
    
    const userAgent = req.headers['user-agent'] || null;

    // Create order in database
    const order = await prisma.landingOrder.create({
      data: {
        fullName: String(fullName).trim(),
        phoneNumber: String(phoneNumber).trim(),
        whatsappNumber: whatsappNumber ? String(whatsappNumber).trim() : null,
        state: String(state).trim(),
        deliveryAddress: String(deliveryAddress).trim(),
        package: String(pkg),
        concerns: Array.isArray(concerns) ? concerns.filter(Boolean) : [],
        ip,
        userAgent,
        status: 'pending'
      },
      select: { 
        id: true, 
        createdAt: true,
        fullName: true,
        phoneNumber: true,
        state: true,
        package: true
      },
    });

    console.log('Order created successfully:', order.id);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Order with this information already exists'
      });
    }
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Required data not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create order. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {};
    if (status) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search } },
        { state: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.landingOrder.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: parseInt(skip),
        take: parseInt(limit),
        select: {
          id: true,
          createdAt: true,
          fullName: true,
          phoneNumber: true,
          whatsappNumber: true,
          state: true,
          deliveryAddress: true,
          package: true,
          status: true,
          concerns: true
        }
      }),
      prisma.landingOrder.count({ where })
    ]);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// Get single order
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.landingOrder.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Valid statuses: ' + validStatuses.join(', ')
      });
    }

    const order = await prisma.landingOrder.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        status: true,
        fullName: true,
        phoneNumber: true
      }
    });

    console.log(`Order ${id} status updated to: ${status}`);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.landingOrder.delete({
      where: { id }
    });

    console.log(`Order ${id} deleted`);

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting order:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete order'
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};