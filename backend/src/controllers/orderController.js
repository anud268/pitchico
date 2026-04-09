const Order = require('../models/Order');
const nimbuspostService = require('../services/nimbuspostService');
const { sendOrderEmail } = require('../utils/mailer');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customer, shipping, paymentMethod, totalAmount, items } = req.body;

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = new Order({
      orderId,
      customer,
      shipping,
      paymentMethod,
      totalAmount,
      items
    });

    const savedOrder = await order.save();

    // Trigger NimbusPost Shipment push
    await nimbuspostService.createShipment({
      orderId: savedOrder.orderId,
      customer: savedOrder.customer,
      shipping: savedOrder.shipping,
      paymentMethod: savedOrder.paymentMethod,
      totalAmount: savedOrder.totalAmount,
      items: savedOrder.items
    });
    // Send Email Notification
    await sendOrderEmail(savedOrder);
    res.status(201).json({
      success: true,
      data: savedOrder,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error(`Create Order Error:`, error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createOrder,
  getOrders
};
