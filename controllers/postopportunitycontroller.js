const PortOpportunity = require("../models/PortOpportunity");

exports.createOpportunity = async (req, res) => {
  try {
    const {
      title,
      organization,
      category,
      location,
      deadline,
      description,
      tags,
      email,
      phone,
    } = req.body;

    if (!title || !organization || !category || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const fileUrl = req.file ? req.file.path : null;

    const opportunity = new PortOpportunity({
      title,
      organization,
      category,
      location,
      deadline,
      description,
      tags,
      email,
      phone,
      fileUrl,
    });

    await opportunity.save();
    res.status(201).json({ message: "Opportunity created", opportunity });
  } catch (error) {
    res.status(500).json({ error: "Failed to create opportunity" });
  }
};

exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await PortOpportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
};

exports.getOpportunityById = async (req, res) => {
  try {
    const opportunity = await PortOpportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ error: "Opportunity not found" });
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ error: "Error fetching opportunity" });
  }
};

exports.updateOpportunityStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "posted"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await PortOpportunity.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Opportunity not found" });

    res.json({ message: "Status updated", opportunity: updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};
