const mongoose = require("mongoose");

const mergedSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["contact", "appointment"],
      required: true,
    },
    // Shared Fields
    fullName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },

    // Contact-specific Fields
    subject: {
      type: String,
      enum: [
        "general",
        "services",
        "franchise",
        "partnership",
        "other",
      ],
    },
    message: {
      type: String,
    },

    // Appointment-specific Fields
    meetingType: {
      type: String,
      enum: ["virtual", "inperson", "phone"],
    },
    preferredDate: {
      type: Date,
    },
    preferredTime: {
      type: String,
    },
    topic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry =
  mongoose.models.Inquiry || mongoose.model("Inquiry", mergedSchema);

module.exports = Inquiry
