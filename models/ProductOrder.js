const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    organization: { type: String, required: true },
    product: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductOrder', productOrderSchema);
