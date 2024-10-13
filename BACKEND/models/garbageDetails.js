const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const garbageSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    contactNumber : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    weight : {
        type : Number,
        required : true
    },
    additionalNotes : {
        type : String,
        required : true
    },
    
})

const Garbage = mongoose.model("Garbage",garbageSchema);

module.exports = Garbage;