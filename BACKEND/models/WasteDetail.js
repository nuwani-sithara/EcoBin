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
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    route: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const WasteDetail = mongoose.model("WasteDetail", wasteSchema);
module.exports = WasteDetail;