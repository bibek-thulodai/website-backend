const mongoose = require("mongoose");

const portOpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  category: { type: String, required: true },
  location: String,
  deadline: String,
  description: String,
  tags: String,
  email: { type: String, required: true },
  phone: String,
  fileUrl: String,
  status: { type: String, enum: ["pending", "posted"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("PortOpportunity", portOpportunitySchema);
