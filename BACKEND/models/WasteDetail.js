const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wasteSchema = new Schema({

    email:{
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    waste: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    weightType: {
        type: String,
        required: false
    },
    
    date: {
        type: Date,
        required: false
    },
    route: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'Pending'
    },
}, {
    timestamps: true
});

const WasteDetail = mongoose.model("WasteDetail", wasteSchema);
module.exports = WasteDetail;