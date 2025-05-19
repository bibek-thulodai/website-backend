const Inquiry = require("../models/Inquiry");

// Create new inquiry
const createInquiry = async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json(newInquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all inquiries
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all inquiries by type
const getInquiriesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const inquiries = await Inquiry.find({ type }).sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single inquiry by ID
const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(inquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  getInquiriesByType,
};
