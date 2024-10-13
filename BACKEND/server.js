const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Connection Success!');
});

const garbageRouter = require("./routes/garbageDetails.js");
const scheduleRouter = require("./routes/scheduleTime.js");
const calculatepaymentRouter = require("./routes/calculatepayment.js");
const cardpaymentRouter = require("./routes/cardpayment.js");


app.use("/garbage",garbageRouter);
app.use("/schedule",scheduleRouter);
app.use("/calculatepayment",calculatepaymentRouter);
app.use("/cardpayment",cardpaymentRouter);
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/recycle', require('./routes/recycle')); // Recycle management routes

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});




