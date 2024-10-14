const express = require('express');
const router = express.Router();
const CompostRequest = require('../models/CompostRequest'); // Mongoose model

// Create a new compost request
router.post('/addcompostrequest', async (req, res) => {
    const { email, potential, amount, cost, address } = req.body;
    console.log('Request Body:', req.body); // Log incoming data to see if it matches expectations

    try {
        const newRequest = new CompostRequest({
            email,
            potential,
            amount,
            cost,
            address,
            requestDate: new Date(),
            status: 'Pending'
        });

        await newRequest.save();
        res.json('Compost Request Added');
    } catch (err) {
        console.log('Error:', err); // Log the error to understand what went wrong
        res.status(500).send({ status: 'Error with adding compost request', error: err.message });
    }
});


// Get all compost requests
router.get('/getallcompostrequests', async (req, res) => {
    try {
        const compostRequests = await CompostRequest.find();
        res.json(compostRequests);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with retrieving requests', error: err.message });
    }
});

// Update a compost request
router.put('/updatecompostrequest/:id', async (req, res) => {
    const requestID = req.params.id;
    const { email, amount, cost, address, status } = req.body;
    const updateRequest = {email, amount, cost, address, status };

    try {
        const updatedRequest = await CompostRequest.findByIdAndUpdate(requestID, updateRequest, { new: true });
        res.status(200).send({ status: 'Request updated', updatedRequest });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data', error: err.message });
    }
});

//user update compost request
router.put('/updatemycompostrequest/:id', async (req, res) => {
    const requestID = req.params.id;
    const { amount, potential } = req.body;

    if (amount > potential) {
        return res.status(400).send({ status: 'Error', message: 'Amount exceeds potential' });
    }

    try {
        const updatedRequest = await CompostRequest.findByIdAndUpdate(
            requestID,
            { amount },
            { new: true }
        );
        res.status(200).send({ status: 'Request updated', updatedRequest });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data', error: err.message });
    }
});


// Delete a compost request by ID
router.delete('/deletecompostrequest/:id', async (req, res) => {
    const requestID = req.params.id;

    try {
        await CompostRequest.findByIdAndDelete(requestID);
        res.status(200).send({ status: 'Request deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with deleting data', error: err.message });
    }
});

// Get compost request by userEmail
router.get('/getcompostrequest/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    try {
        const compostRequest = await CompostRequest.find({ email: userEmail });
        if (!compostRequest) {
            res.status(400).json({ status: 'Request not found' });
        } else {
            res.json(compostRequest);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with retrieving request', error: err.message });
    }
});

module.exports = router;
