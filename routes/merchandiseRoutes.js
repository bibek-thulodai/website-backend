const express = require('express');
const router = express.Router();
const merchandiseController = require('../controllers/merchandiseController');

router.post('/', merchandiseController.createMerchandise);
router.get('/', merchandiseController.getAllMerchandise);
router.get('/status/:status', merchandiseController.getMerchandiseByStatus); // NEW
router.get('/:id', merchandiseController.getMerchandiseById);
router.put('/:id', merchandiseController.updateMerchandise);

module.exports = router;
