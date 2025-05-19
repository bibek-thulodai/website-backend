const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/franchise.controller');

// Create a new franchise application
router.post('/', franchiseController.createFranchise);

// Get all franchise applications
router.get('/', franchiseController.getAllFranchises);

// Get a single franchise application
router.get('/:id', franchiseController.getFranchiseById);

// Update franchise application status
router.patch('/:id/status', franchiseController.updateFranchiseStatus);

module.exports = router;
