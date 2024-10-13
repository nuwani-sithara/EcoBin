const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    address : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    dateTime: { 
        type: Date, 
        required: true 
    },
})

const Schedule = mongoose.model("Schedule",scheduleSchema);

module.exports = Schedule;