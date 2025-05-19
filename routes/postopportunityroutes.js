const express = require("express");
const router = express.Router();
const upload = require("../middleware/filemiddleware");
const {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunityStatus,
} = require("../controllers/postopportunitycontroller");

router.post("/", upload.single("file"), createOpportunity);
router.get("/", getAllOpportunities);
router.get("/:id", getOpportunityById);
router.patch("/:id/status", updateOpportunityStatus);

module.exports = router;
