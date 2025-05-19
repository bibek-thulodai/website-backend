const mongoose = require("mongoose");

const merchandiseProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  code: { type: String, required: true },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("MerchandiseProduct", merchandiseProductSchema);
