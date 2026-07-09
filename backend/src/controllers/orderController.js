const Order = require('../models/Order');
const Product = require('../models/Product');

const addOrderItems = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod = 'Cash on Delivery' } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const ids = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: ids } });

    const cleanItems = orderItems.map((item) => {
      const product = products.find((p) => p._id.toString() === item.product);
      if (!product) throw new Error(`Product not found: ${item.product}`);
      if (product.countInStock < item.quantity) throw new Error(`${product.name} is out of stock`);
      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: Number(item.quantity),
      };
    });

    const itemsPrice = cleanItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingPrice = 0;
    const taxPrice = Number((itemsPrice * 0.08).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    const order = await Order.create({
      user: req.user._id,
      orderItems: cleanItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    for (const item of cleanItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.quantity } });
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not allowed to view this order');
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    order.status = req.body.status || order.status;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderStatus };
