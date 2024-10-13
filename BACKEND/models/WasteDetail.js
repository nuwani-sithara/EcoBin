const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wasteSchema = new Schema({
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
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const WasteDetail = mongoose.model("WasteDetail", wasteSchema);
module.exports = WasteDetail;