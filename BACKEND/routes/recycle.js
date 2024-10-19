// routes/recycleRoutes.js
const express = require('express');
const { createCollection, getAllCollections, updateCollectionStatus, getRecycleHistoryByEmail } = require('../controllers/recycleController');
const auth = require('../middleware/auth'); // JWT Authentication Middleware

const router = express.Router();

// POST route to handle recycling data
router.post('/', createCollection);

// GET route to fetch all collections
router.get('/', getAllCollections);

// PUT route to update collection status by ID
router.put('/update-status', updateCollectionStatus);

// GET route to fetch recycle history for a specific user by email
router.get('/history/:userEmail', auth, getRecycleHistoryByEmail);

module.exports = router;
