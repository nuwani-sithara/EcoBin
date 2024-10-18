const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Middleware to verify JWT toke
const User = require('../models/User');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, address, district, phoneNumber, user_type } = req.body;

  try {
    if (!name || !email || !password || !address || !district || !phoneNumber) {
      return res.status(400).json({ msg: 'Please enter all required fields.' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    user = new User({
      name,
      email,
      password,
      address,
      district,
      phoneNumber,
      user_type, // Save user_type from request body (if provided)
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id, user_type: user.user_type } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id, user_type: user.user_type } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        // Send both the token and user_type in the response
        res.json({ token, userType: user.user_type });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




router.get('/user', auth, async (req, res) => {
  try {
    // Find user by ID, exclude the password field
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
