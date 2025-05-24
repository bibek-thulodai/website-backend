const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const newsletterRoutes = require('./routes/newsletter');
const inquiryRoutes = require("./routes/inquiryRoutes");
const articleRoutes = require("./routes/articleRoutes");
const serviceOrderRoutes = require("./routes/serviceOrderRoutes");
const productOrderRoutes = require('./routes/productOrderRoutes');
const merchandiseRoutes = require('./routes/merchandiseRoutes');
const merchandiseProductRoute = require("./routes/merchandiseProductRoute");
const franchiseRoutes = require('./routes/franchise.routes');
const opportunityRoutes = require("./routes/opportunityRoutes");
const postopportunityRoutes = require("./routes/postopportunityroutes");

const galleryRoutes = require('./routes/galleryRoutes');

const app = express();

// ===== Middleware =====
app.use(cors()); // ✅ Enable Cross-Origin Resource Sharing
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));

// ===== Database Connection =====
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// ===== API Routes =====
app.use('/api', authRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use("/api/inquiries", inquiryRoutes); // <-- Contact form should POST here
app.use("/api/articles", articleRoutes);
app.use("/api/orders", serviceOrderRoutes);
app.use('/api/product', productOrderRoutes);
app.use('/api/merchandise', merchandiseRoutes);
app.use("/api/merchandise-products", merchandiseProductRoute);
app.use('/api/franchises', franchiseRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/opportunities-form", postopportunityRoutes);
app.use('/api/gallery', galleryRoutes);

// ===== OPTIONAL: Alias for contact form =====
// Uncomment this if you want frontend to call /contact instead of /api/inquiries
// app.use('/contact', inquiryRoutes);

// ===== Server Listen =====
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
