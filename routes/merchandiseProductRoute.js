const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createMerchandiseProduct,
  getAllMerchandiseProducts,
  updateMerchandiseProduct,
} = require("../controllers/merchandiseProductController");

router.post("/", upload.single("image"), createMerchandiseProduct);
router.get("/", getAllMerchandiseProducts);
router.put("/:id", upload.single("image"), updateMerchandiseProduct);

module.exports = router;
