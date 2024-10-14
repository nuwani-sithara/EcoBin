const { compareSync } = require('bcryptjs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompostRequestSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
        default: 'Pending',
        required: true
    },
    potential: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CompostRequest', CompostRequestSchema);