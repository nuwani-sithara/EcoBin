const WasteDetail = require('../models/WasteDetail');

// Add multiple waste details
exports.addWasteMultiple = async (req, res) => {
    const { wasteDetails } = req.body;

    try {
        if (!Array.isArray(wasteDetails) || wasteDetails.length === 0) {
            return res.status(400).json({ error: "Waste details must be an array and cannot be empty." });
        }

        const newWastePromises = wasteDetails.map(wasteDetail => {
            const { email, category, waste, weight, weightType, route } = wasteDetail;
            const newWaste = new WasteDetail({
                email,
                category,
                waste,
                weight,
                weightType,
                route
            });
            return newWaste.save();
        });

        await Promise.all(newWastePromises);
        res.status(200).json("Multiple Waste Details Added Successfully");
    } catch (err) {
        console.error("Error adding multiple waste details:", err);
        res.status(500).json({ error: err.message });
    }
};

// View all waste details
exports.viewWaste = async (req, res) => {
    try {
        const wasteDetails = await WasteDetail.find().populate('category');
        res.status(200).json(wasteDetails);
    } catch (err) {
        console.error("Error fetching waste details:", err);
        res.status(500).json({ error: err.message });
    }
};

// Update waste detail
exports.updateWaste = async (req, res) => {
    const wasteId = req.params.wasteId;
    const { email, category, waste, weight, route, status } = req.body;

    try {
        const updateWasteDetail = { email, category, waste, weight, route, status };
        await WasteDetail.findByIdAndUpdate(wasteId, updateWasteDetail);
        res.status(200).send({ status: "Waste Details Updated" });
    } catch (err) {
        console.error("Error updating waste details:", err);
        res.status(500).send({ status: "Error with updating waste details", error: err.message });
    }
};

// Delete waste detail
exports.deleteWaste = async (req, res) => {
    const wasteId = req.params.wasteId;

    try {
        await WasteDetail.findByIdAndDelete(wasteId);
        res.status(200).send({ status: "Waste Details Deleted" });
    } catch (err) {
        console.error("Error deleting waste details:", err);
        res.status(500).send({ status: "Error with deleting waste details", error: err.message });
    }
};

// Fetch single waste detail
exports.getWaste = async (req, res) => {
    const wasteId = req.params.wasteId;

    try {
        const wasteDetail = await WasteDetail.findById(wasteId).populate('category');
        res.status(200).send({ status: "Waste Details Fetched", wasteDetail });
    } catch (err) {
        console.error("Error fetching waste details:", err);
        res.status(500).send({ status: "Error with fetching waste details", error: err.message });
    }
};

// Fetch waste details by user email
exports.getWasteByEmail = async (req, res) => {
    const userEmail = req.params.email;

    try {
        const wasteDetails = await WasteDetail.find({ email: userEmail });

        if (!wasteDetails) {
            return res.status(404).json({ message: "No waste details found for this user" });
        }

        res.json(wasteDetails);
    } catch (err) {
        console.error("Error fetching waste details:", err);
        res.status(500).json({ error: "Server error" });
    }
};
