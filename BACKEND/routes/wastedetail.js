const express = require('express');
const router = express.Router();
const wasteDetailController = require('../controllers/wasteDetailController');

// Add multiple waste details
router.post('/add-waste-multiple', wasteDetailController.addWasteMultiple);

// View all waste details
router.get('/view-waste', wasteDetailController.viewWaste);

// Update waste detail
router.put('/update-waste/:wasteId', wasteDetailController.updateWaste);

// Delete waste detail
router.delete('/delete-waste/:wasteId', wasteDetailController.deleteWaste);

// Fetch single waste detail
router.get('/get-waste/:wasteId', wasteDetailController.getWaste);

// Fetch waste details by user email
router.get('/user-waste/:email', wasteDetailController.getWasteByEmail);

module.exports = router;
