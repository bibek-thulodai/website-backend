const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: { type: String },
    content: { type: String },
    category: { type: String },
    date: { type: Date, default: Date.now },
    author: { type: String, required: true }, // Only author name as string
    readTime: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug
ArticleSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Article", ArticleSchema);
