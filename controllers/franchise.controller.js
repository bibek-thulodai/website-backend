const Franchise = require('../models/franchise.model');

// Create a new franchise application
exports.createFranchise = async (req, res) => {
  try {
    const newApplication = new Franchise(req.body);
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all franchise applications
exports.getAllFranchises = async (req, res) => {
  try {
    const applications = await Franchise.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single franchise application by ID
exports.getFranchiseById = async (req, res) => {
  try {
    const application = await Franchise.findById(req.params.id);
    if (!application) return res.status(404).json({ error: 'Franchise not found' });
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update franchise status
exports.updateFranchiseStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Franchise.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Franchise not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
