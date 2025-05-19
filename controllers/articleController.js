const Article = require("../models/Article");
const fs = require("fs");
const path = require("path");

// Create
exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      date,
      author,
      readTime,
      tags,
      featured,
    } = req.body;

    const articleData = {
      title,
      excerpt,
      content,
      category,
      date,
      author, // Use author as plain string
      readTime,
      tags: tags ? tags.split(",") : [],
      featured: featured === "true" || featured === true,
    };

    if (req.file) {
      articleData.image = "/uploads/articles/" + req.file.filename;
    }

    const article = new Article(articleData);
    const saved = await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read featured
exports.getFeaturedArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ featured: true }).sort({ createdAt: -1 });
    if (!article) return res.status(404).json({ error: "No featured article found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read single
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateArticle = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      date,
      author,
      readTime,
      tags,
      featured,
    } = req.body;

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });

    // Update fields
    article.title = title ?? article.title;
    article.excerpt = excerpt ?? article.excerpt;
    article.content = content ?? article.content;
    article.category = category ?? article.category;
    article.date = date ?? article.date;
    article.author = author ?? article.author; // Use author as plain string
    article.readTime = readTime ?? article.readTime;
    article.tags = tags ? tags.split(",") : article.tags;
    article.featured = featured === "true" || featured === true;

    // Update image
    if (req.file) {
      // Delete old image if it exists
      if (article.image) {
        const oldPath = path.join(__dirname, "..", article.image);
        fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
      }
      article.image = "/uploads/articles/" + req.file.filename;
    }

    const updated = await article.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });

    if (article.image) {
      const imagePath = path.join(__dirname, "..", article.image);
      fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
