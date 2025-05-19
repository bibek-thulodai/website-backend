const mongoose = require('mongoose');

const merchandiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  quantity: { type: String },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Merchandise', merchandiseSchema);
