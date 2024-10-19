const express = require('express');
const router = express.Router();
const compostRequestController = require('../controllers/compostRequestController');

// Route to add a new compost request
router.post('/addcompostrequest', compostRequestController.addCompostRequest);

// Route to get all compost requests
router.get('/getallcompostrequests', compostRequestController.getAllCompostRequests);

// Route to update a compost request by admin
router.put('/updatecompostrequest/:id', compostRequestController.updateCompostRequest);

// Route to update a compost request by user
router.put('/updatemycompostrequest/:id', compostRequestController.updateMyCompostRequest);

// Route to delete a compost request
router.delete('/deletecompostrequest/:id', compostRequestController.deleteCompostRequest);

// Route to get a compost request by user email
router.get('/getcompostrequest/:userEmail', compostRequestController.getCompostRequestByEmail);

module.exports = router;
