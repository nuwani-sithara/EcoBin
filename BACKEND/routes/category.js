const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Add Category
router.post('/add-category', categoryController.addCategory);

// View All Categories
router.get('/view-categories', categoryController.viewCategories);

// Update Category
router.put('/update-category/:categoryId', categoryController.updateCategory);

// Delete Category
router.delete('/delete-category/:categoryId', categoryController.deleteCategory);

// Fetch Single Category
router.get('/get-category/:categoryId', categoryController.getCategory);

module.exports = router;
