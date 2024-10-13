const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pickupSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    }
    
})

const PickupDetail = mongoose.model("PickupDetail", pickupSchema);


module.exports = PickupDetail;