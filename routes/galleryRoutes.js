const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const galleryController = require('../controllers/galleryController');

// Upload a new gallery item
router.post('/', upload.single('image'), galleryController.createGallery);

// Get all gallery items
router.get('/', galleryController.getAllGallery);

module.exports = router;
