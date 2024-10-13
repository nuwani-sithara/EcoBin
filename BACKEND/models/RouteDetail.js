const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routeSchema = new Schema({

    date : {
        type : Date,
        required : true
    },
    route : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    }
    
})

const RouteDetail = mongoose.model("RouteDetail", routeSchema);


module.exports = RouteDetail;