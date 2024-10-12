const express = require('express');
const Payment = require('../models/calculatepayment'); // Adjust the path as needed
const router = express.Router();


//user
// 1. Create a new payment
router.post('/addpaymentdetails', async (req, res) => {
    try {
        const { garbageId, amount } = req.body;

        const newPayment = new Payment({
            garbageId,
            amount,
        });

        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});

// 2. Get all payments
router.get('/getallpaymentdetails', async (req, res) => {
    try {
        const payments = await Payment.find().populate('garbageId');
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error retrieving payments:', error);
        res.status(500).json({ error: 'Failed to retrieve payments' });
    }
});

// 3. Get a payment by ID
router.get('/getpaymentdetails/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('garbageId');
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error retrieving payment:', error);
        res.status(500).json({ error: 'Failed to retrieve payment' });
    }
});

// 4. Update a payment by ID
router.put('/updatepaymentdetails/:id', async (req, res) => {
    try {
        const { amount, status } = req.body;

        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            { amount, status },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ error: 'Failed to update payment' });
    }
});

// 5. Delete a payment by ID
router.delete('/deletepaymentdetails/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Attempting to delete payment with ID:', id); // Log the ID

    try {
        const result = await Payment.deleteOne({ _id: id }); // Use _id if that's your identifier
        console.log('Delete result:', result); // Log the result of the delete operation
        if (result.deletedCount === 0) {
            return res.status(404).send('Payment not found');
        }
        res.status(200).send('Payment deleted successfully');
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).send('Server error');
    }
});




module.exports = router;
