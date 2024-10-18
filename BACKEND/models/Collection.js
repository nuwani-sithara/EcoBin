const mongoose = require('mongoose');

// Define the Collection Schema
const CollectionSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      itemName: { type: String, required: true },
      weight: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  totalWeight: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  toReceive: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  status: { type: String, default: 'pending' }, // Ensure status field exists
});

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;
