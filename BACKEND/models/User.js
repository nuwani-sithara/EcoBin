const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  district: {
    type: String,
    required: [true, 'District is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone Number is required'],
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'], // Optional: Only allow specific user types
    default: 'user', // Default to 'user' if not specified
  },
}, { timestamps: true }); // This will automatically add createdAt and updatedAt timestamps


module.exports = mongoose.model('User', userSchema);
