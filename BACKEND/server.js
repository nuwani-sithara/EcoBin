const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Connection Success!');
});

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/recycle', require('./routes/recycle')); // Recycle management routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
