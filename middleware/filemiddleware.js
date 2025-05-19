const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (![".pdf", ".doc", ".docx", ".jpg", ".png"].includes(ext)) {
      return cb(new Error("Only documents and images are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
