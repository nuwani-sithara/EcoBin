const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection'); // Import the Collection model

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

module.exports = router;
