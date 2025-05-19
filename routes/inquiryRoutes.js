const express = require("express");
const router = express.Router();
const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  getInquiriesByType,
} = require("../controllers/inquiryController");

router.post("/", createInquiry);
router.get("/", getAllInquiries);
router.get("/:id", getInquiryById);
router.get("/type/:type", getInquiriesByType);

module.exports = router;
