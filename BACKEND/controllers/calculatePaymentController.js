const Payment = require('../models/calculatePayment');

// 1. Create a new payment
const createPayment = async (req, res) => {
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
};

// 2. Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('garbageId');
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error retrieving payments:', error);
        res.status(500).json({ error: 'Failed to retrieve payments' });
    }
};

// 3. Get a payment by ID
const getPaymentById = async (req, res) => {
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
};

// 4. Update a payment by ID
const updatePaymentById = async (req, res) => {
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
};

// 5. Delete a payment by ID
const deletePaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Payment.deleteOne({ _id: id }); // Use _id as the identifier
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).send('Payment deleted successfully');
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
};
