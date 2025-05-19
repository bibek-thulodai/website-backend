const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createOpportunity,
  updateOpportunity,
  getAllOpportunities,
} = require("../controllers/opportunityController");

router.post("/", upload.single("logo"), createOpportunity);
router.put("/:id", upload.single("logo"), updateOpportunity);
router.get("/", getAllOpportunities);

module.exports = router;
