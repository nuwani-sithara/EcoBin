const Garbage = require("../models/garbageDetails");

// Insert garbageDetails
const addGarbageDetails = (req, res) => {
    const { name, contactNumber, type, weight, additionalNotes } = req.body;

    if (!name || !contactNumber || !type || !weight || !additionalNotes) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const newGarbage = new Garbage({
        name,
        contactNumber: Number(contactNumber),
        type,
        weight: Number(weight),
        additionalNotes
    });

    newGarbage
        .save()
        .then((savedGarbage) => {
            res.json({
                message: "Garbage Details Added...",
                garbageId: savedGarbage._id
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to add garbage details." });
        });
};

// Display all garbageDetails
const getAllGarbageDetails = (req, res) => {
    Garbage.find()
        .then((garbage) => {
            res.json(garbage);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch garbage details." });
        });
};

// Update garbageDetails
const updateGarbageDetails = async (req, res) => {
    let garId = req.params.garid;
    const { name, contactNumber, type, weight, additionalNotes } = req.body;

    const updatedGarbageDetails = {
        name,
        contactNumber: Number(contactNumber),
        type,
        weight: Number(weight),
        additionalNotes
    };

    try {
        const updated = await Garbage.findByIdAndUpdate(garId, updatedGarbageDetails, { new: true });
        if (!updated) {
            return res.status(404).json({ error: "Garbage details not found." });
        }
        res.status(200).json({ status: "Garbage Details updated successfully", garbage: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating garbage details", error: err.message });
    }
};

// Delete garbageDetails
const deleteGarbageDetails = async (req, res) => {
    let garId = req.params.garid;

    try {
        const deletedGarbage = await Garbage.findByIdAndDelete(garId);
        if (!deletedGarbage) {
            return res.status(404).json({ error: "Garbage details not found." });
        }
        res.status(200).json({ status: "Garbage Details deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error deleting garbage details", error: err.message });
    }
};

// Get garbage details by ID
const getGarbageById = async (req, res) => {
    let garId = req.params.garid;

    try {
        const garbage = await Garbage.findById(garId);
        if (!garbage) {
            return res.status(404).json({ status: "Garbage details not found" });
        }
        res.status(200).json({ status: "Garbage details fetched", garbage });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error fetching garbage details", error: err.message });
    }
};

module.exports = {
    addGarbageDetails,
    getAllGarbageDetails,
    updateGarbageDetails,
    deleteGarbageDetails,
    getGarbageById
};
