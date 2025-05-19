const express = require('express');
const router = express.Router();
const controller = require('../controllers/productOrderController');

router.post('/', controller.createOrder);
router.get('/', controller.getAllOrders);
router.get('/:id', controller.getOrderById);
router.patch('/:id/status', controller.updateStatus);

module.exports = router;
