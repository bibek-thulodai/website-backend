const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createArticle,
  getAllArticles,
  getFeaturedArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

// CRUD routes
router.post("/", upload.single("image"), createArticle);
router.get("/", getAllArticles);
router.get("/featured", getFeaturedArticle);
router.get("/:id", getArticleById);
router.put("/:id", upload.single("image"), updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
