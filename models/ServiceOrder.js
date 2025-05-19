const mongoose = require("mongoose");

const serviceOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  organization: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("ServiceOrder", serviceOrderSchema);
