const router = require("express").Router();
let WasteDetail = require("../models/WasteDetail");

router.route("/add-waste-multiple").post(async (req, res) => {
    const { wasteDetails } = req.body;  // Expecting an array of waste details

    try {
        if (!Array.isArray(wasteDetails) || wasteDetails.length === 0) {
            return res.status(400).json({ error: "Waste details must be an array and cannot be empty." });
        }

        // Save all waste details
        const newWastePromises = wasteDetails.map(wasteDetail => {
            const { email, category, waste, weight, weightType, route } = wasteDetail;  // Include route
            const newWaste = new WasteDetail({
                email,
                category,
                waste,
                weight,
                weightType,
                route // Save route
            });
            return newWaste.save();
        });

        await Promise.all(newWastePromises); // Wait for all promises to complete
        res.status(200).json("Multiple Waste Details Added Successfully");

    } catch (err) {
        console.error("Error adding multiple waste details:", err);
        res.status(500).json({ error: err.message });
    }
});

// View All Waste Details
router.route("/view-waste").get((req, res) => {
    WasteDetail.find().populate('category')  // Make sure 'category' is a valid reference
        .then(wasteDetails => res.json(wasteDetails))
        .catch(err => {
            console.error("Error fetching waste details:", err);
            res.status(500).json({ error: err.message });
        });
});

// Update Waste Detail
router.route("/update-waste/:wasteId").put(async (req, res) => {
    const wasteId = req.params.wasteId;
    const { email, category, waste, weight, weightType, quantity } = req.body;

    try {
        const updateWasteDetail = {email, category, waste, weight, weightType, quantity };
        await WasteDetail.findByIdAndUpdate(wasteId, updateWasteDetail);
        res.status(200).send({ status: "Waste Details Updated" });
    } catch (err) {
        console.error("Error updating waste details:", err);
        res.status(500).send({ status: "Error with updating waste details", error: err.message });
    }
});

// Delete Waste Detail
router.route("/delete-waste/:wasteId").delete(async (req, res) => {
    const wasteId = req.params.wasteId;

    try {
        await WasteDetail.findByIdAndDelete(wasteId);
        res.status(200).send({ status: "Waste Details Deleted" });
    } catch (err) {
        console.error("Error deleting waste details:", err);
        res.status(500).send({ status: "Error with deleting waste details", error: err.message });
    }
});

// Fetch Single Waste Detail
router.route("/get-waste/:wasteId").get(async (req, res) => {
    const wasteId = req.params.wasteId;

    try {
        const wasteDetail = await WasteDetail.findById(wasteId).populate('category');
        res.status(200).send({ status: "Waste Details Fetched", wasteDetail });
    } catch (err) {
        console.error("Error fetching waste details:", err);
        res.status(500).send({ status: "Error with fetching waste details", error: err.message });
    }
});

// Fetch Waste Details by User Email
router.get("/user-waste/:email", async (req, res) => {
    const userEmail = req.params.email;

    try {
        // Find all waste entries where email matches the user's email
        const wasteDetails = await WasteDetail.find({ email: userEmail });

        if (!wasteDetails) {
            return res.status(404).json({ message: "No waste details found for this user" });
        }

        // Send the waste details as the response
        res.json(wasteDetails);
    } catch (err) {
        console.error("Error fetching waste details:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
