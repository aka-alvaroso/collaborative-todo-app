// /routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta de registro
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/verify', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;
