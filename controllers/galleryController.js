const Gallery = require('../models/Gallery');

// Create a new gallery item
exports.createGallery = async (req, res) => {
  try {
    const { title, category, description, date } = req.body;
    const image = req.file ? `/uploads/gallery/${req.file.filename}` : '';

    const gallery = new Gallery({ title, category, description, image, date });
    await gallery.save();

    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gallery item' });
  }
};

// Get all gallery items
exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ date: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
};
