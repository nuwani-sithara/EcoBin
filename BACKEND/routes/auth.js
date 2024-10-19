// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();


// User Registration Route
router.post('/register', registerUser);

// User Login Route
router.post('/login', loginUser);

// Get User Information (Protected Route)
router.get('/user', auth, getUser);

module.exports = router;
