const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardpaymentSchema = new Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: function() {
            return this.paymentMethod === 'online'; // Only required for online payments
        }
    },
    expiryDate: {
        type: String,
        required: function() {
            return this.paymentMethod === 'online'; // Only required for online payments
        }
    },
    cvv: {
        type: String,
        required: function() {
            return this.paymentMethod === 'online'; // Only required for online payments
        }
    },
    saveCard: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
});

const CardPayment = mongoose.model('CardPayment', cardpaymentSchema);

module.exports = CardPayment;
