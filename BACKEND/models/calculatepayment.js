const mongoose = require('mongoose');

const Schema = mongoose.Schema;



//user
const calculatepaymentSchema = new Schema({
    garbageId: {
        type: Schema.Types.ObjectId,
        ref: 'Garbage', // Reference to the Garbage model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

const CalculatePayment = mongoose.model('CalculatePayment', calculatepaymentSchema);

module.exports = CalculatePayment;
