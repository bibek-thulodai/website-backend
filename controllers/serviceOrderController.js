const ServiceOrder = require("../models/ServiceOrder");
const router = require("../routes/articleRoutes");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { name, email, phone, organization, serviceTitle } = req.body;
    const newOrder = new ServiceOrder({ name, email, phone, organization, serviceTitle });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await ServiceOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order", error });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await ServiceOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
}