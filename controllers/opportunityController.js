const Opportunity = require("../models/Opportunity");

// Create opportunity
exports.createOpportunity = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.logo = `/uploads/articles/${req.file.filename}`;
    }

    const opportunity = new Opportunity(data);
    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update opportunity
exports.updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) {
      data.logo = `/uploads/articles/${req.file.filename}`;
    }

    const opportunity = await Opportunity.findByIdAndUpdate(id, data, { new: true });
    if (!opportunity) return res.status(404).json({ message: "Opportunity not found" });

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all opportunities
exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
