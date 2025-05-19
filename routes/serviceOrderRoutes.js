const express = require("express");
const router = express.Router();
const controller = require("../controllers/serviceOrderController");

router.post("/", controller.createOrder);
router.get("/", controller.getAllOrders);
router.get("/:id", controller.getOrderById);
router.put("/:id", controller.updateOrderStatus);

module.exports = router;