const Merchandise = require('../models/Merchandise');

// Create a new merchandise order
exports.createMerchandise = async (req, res) => {
  try {
    const { name, email, phone, quantity, message } = req.body;

    const newMerch = new Merchandise({
      name,
      email,
      phone,
      quantity,
      message,
      status: 'pending' // default, can be omitted if already in schema default
    });

    await newMerch.save();
    res.status(201).json(newMerch);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create merchandise order', details: err.message });
  }
};

// Get all merchandise orders
exports.getAllMerchandise = async (req, res) => {
  try {
    const merchList = await Merchandise.find().sort({ createdAt: -1 });
    res.json(merchList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve merchandise orders' });
  }
};

// Get a merchandise order by ID
exports.getMerchandiseById = async (req, res) => {
  try {
    const merch = await Merchandise.findById(req.params.id);
    if (!merch) return res.status(404).json({ error: 'Merchandise order not found' });
    res.json(merch);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching merchandise order' });
  }
};

// Update a merchandise order (includes status)
exports.updateMerchandise = async (req, res) => {
  try {
    const updatedData = req.body;

    const merch = await Merchandise.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!merch) return res.status(404).json({ error: 'Merchandise order not found' });
    res.json(merch);
  } catch (err) {
    res.status(500).json({ error: 'Error updating merchandise order' });
  }
};

// Get all orders filtered by status
exports.getMerchandiseByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ['pending', 'resolved'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const filteredOrders = await Merchandise.find({ status }).sort({ createdAt: -1 });
    res.json(filteredOrders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders by status' });
  }
};
