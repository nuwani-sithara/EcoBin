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
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
const compostrequestRouter = require("./routes/compostrequest.js");


app.use("/garbage",garbageRouter);
app.use("/schedule",scheduleRouter);
app.use("/calculatepayment",calculatepaymentRouter);
app.use("/cardpayment",cardpaymentRouter);
app.use('/compostRequest',compostrequestRouter); 

const authRoutes = require('./routes/auth'); // Import the auth routes
const recycleRoutes = require('./routes/recycle'); // Import the recycle routes

// Use the auth routes
app.use('/api/auth', authRoutes); // All auth routes will now start with /api/auth
app.use('/api/recycle', recycleRoutes); // All recycle routes will now start with /api/recycle







app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});




