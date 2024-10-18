const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection'); // Import the Collection model
const auth = require('../middleware/auth'); // JWT Authentication Middleware

// POST route to handle recycling data
router.post('/', async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      items,
      totalWeight,
      totalPrice,
      paymentType,
      toReceive,
      address,
      district,
      dateTime,
    } = req.body;

    // Log incoming data to ensure that it is being received correctly
    console.log('Request Body:', req.body);

    // Check if any field is undefined
    if (
      !userName ||
      !userEmail ||
      !items ||
      !totalWeight ||
      !totalPrice ||
      !paymentType ||
      !toReceive ||
      !address ||
      !district ||
      !dateTime
    ) {
      console.log('Missing fields in the request body');
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Create a new collection record
    const newCollection = new Collection({
      userName,
      userEmail,
      items,
      totalWeight,
      totalPrice,
      paymentType,
      toReceive,
      address,
      district,
      dateTime,
    });

    // Save the collection record to the database
    await newCollection.save();

    console.log('New collection record created successfully');
    res.status(200).json({ msg: 'Collection scheduled and stored successfully!' });
  } catch (error) {
    console.error('Error saving the collection record:', error.message);
    res.status(500).send('Server error');
  }
});

// GET route to fetch all collections
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find(); // Fetch all collection records
    res.status(200).json(collections); // Return the data as JSON
  } catch (error) {
    console.error('Error fetching collections:', error.message);
    res.status(500).send('Server error');
  }
});

// Update the status of a collection by user email
// Update the status of a collection by its ID
router.put('/update-status', async (req, res) => {
  const { id, status } = req.body;

  try {
    const collection = await Collection.findByIdAndUpdate(
      id, // Find the collection by its ID
      { status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!collection) {
      return res.status(404).json({ msg: 'Collection not found' });
    }

    res.json({ msg: 'Status updated successfully', collection });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to fetch recycle history for a specific user by email
// Route to fetch recycle history for a specific user by email
router.get('/history/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail; // Get userEmail from route parameters

  try {
      const history = await Collection.find({ userEmail : userEmail }); // Query for matching userEmail

      if (!history || history.length === 0) {
          return res.status(404).json({ status: 'No history found for this user' });
      }

      res.json(history); // Send the filtered history back to the frontend
  } catch (error) {
      console.error('Error fetching user history:', error.message);
      res.status(500).send({ status: 'Error retrieving history', error: error.message });
  }
});






module.exports = router;
