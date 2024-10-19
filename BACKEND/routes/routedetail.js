const express = require('express');
const router = express.Router();
const routeDetailController = require('../controllers/routeDetailController');

// Add route
router.post('/add-route', routeDetailController.addRoute);

// View all routes
router.get('/view-route', routeDetailController.viewRoutes);

// Update route
router.put('/update-route/:routeid', routeDetailController.updateRoute);

// Delete route
router.delete('/delete-route/:routeid', routeDetailController.deleteRoute);

// Fetch a single route
router.get('/get-route/:routeid', routeDetailController.getRoute);

module.exports = router;
