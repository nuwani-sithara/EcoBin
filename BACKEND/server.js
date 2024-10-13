const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
})

const wastedetailRouter = require("./routes/wastedetail.js");
const routedetailRouter = require("./routes/routedetail.js");
const pickupdetailRouter = require("./routes/pickupdetail.js");

app.use("/wastedetail", wastedetailRouter);
app.use("/routedetail", routedetailRouter);
app.use("/pickupdetail", pickupdetailRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})