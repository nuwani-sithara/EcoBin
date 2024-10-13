const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wasteSchema = new Schema({

    category : {
        type : String,
        required : true
    },
    waste : {
        type : String,
        required : true
    },
    weight : {
        type : Number,
        required : true
    },
    weightType : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
})

const WasteDetail = mongoose.model("WasteDetail", wasteSchema);


module.exports = WasteDetail;