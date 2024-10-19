const CardPayment = require("../models/cardpayment");

// Controller to process card payment
const processCardPayment = async (req, res) => {
    const { paymentMethod, cardNumber, expiryDate, cvv, saveCard } = req.body;

    // Create a new payment entry
    const newCardPayment = new CardPayment({
        paymentMethod,
        cardNumber: paymentMethod === 'online' ? cardNumber : null,
        expiryDate: paymentMethod === 'online' ? expiryDate : null,
        cvv: paymentMethod === 'online' ? cvv : null,
        saveCard
    });

    try {
        await newCardPayment.save();
        return res.status(200).json({
            message: 'Payment processed successfully!',
            details: {
                paymentMethod,
                amount: 'Rs.350.00'
            }
        });
    } catch (error) {
        console.error('Error saving payment:', error);
        return res.status(500).json({ message: 'Error processing payment' });
    }
};

module.exports = {
    processCardPayment
};
