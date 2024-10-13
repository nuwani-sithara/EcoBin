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
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Connection Success!');
});

const wastedetailRouter = require("./routes/wastedetail.js");
const routedetailRouter = require("./routes/routedetail.js");
const pickupdetailRouter = require("./routes/pickupdetail.js");
const categoryRouter = require("./routes/category.js");


app.use("/wastedetail", wastedetailRouter);
app.use("/routedetail", routedetailRouter);
app.use("/pickupdetail", pickupdetailRouter);
app.use("/category", categoryRouter);

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

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(bodyParser.json()); // Parse JSON requests

// Routes


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
