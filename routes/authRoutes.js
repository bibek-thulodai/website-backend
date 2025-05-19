const express = require('express');
const {
  register,
  login,
  adminDashboard,
  changePassword
} = require('../controllers/authController');

const auth = require('../middleware/auth');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admin/dashboard', auth, checkAdmin, adminDashboard);
router.post('/change-password', auth, changePassword);

module.exports = router;
