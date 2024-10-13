const express = require('express');

const router = express.Router();

// Mock database
let compostRequests = require('../models/compostrequests.json');

// Get all compost requests
router.get('/getallcompostrequsests', (req, res) => {
    res.json(compostRequests);
});

// Create a new compost request
router.post('/addcompostrequest', (req, res) => {
    const newRequest = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        requestDate: new Date()
    };
    compostRequests.push(newRequest);
    res.status(201).json(newRequest);
});

// Get a specific compost request by ID
router.get('/getcompostrequest/:id', (req, res) => {
    const request = compostRequests.find(r => r.id === parseInt(req.params.id));
    if (!request) return res.status(404).send('The request with the given ID was not found.');
    res.json(request);
});

// Update a compost request by ID
router.put('/updatecompostrequest/:id', (req, res) => {
    const request = compostRequests.find(r => r.id === parseInt(req.params.id));
    if (!request) return res.status(404).send('The request with the given ID was not found.');

    request.name = req.body.name;
    request.address = req.body.address;
    res.json(request);
});

// Delete a compost request by ID
router.delete('/deletecompostrequest/:id', (req, res) => {
    const requestIndex = compostRequests.findIndex(r => r.id === parseInt(req.params.id));
    if (requestIndex === -1) return res.status(404).send('The request with the given ID was not found.');

    const deletedRequest = compostRequests.splice(requestIndex, 1);
    res.json(deletedRequest);
});

module.exports = router;