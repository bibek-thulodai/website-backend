const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["job", "internship", "scholarship", "competition", "fellowship", "workshop"],
  },
  title: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: true },
  deadline: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  logo: { type: String }, // File path
}, { timestamps: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);
