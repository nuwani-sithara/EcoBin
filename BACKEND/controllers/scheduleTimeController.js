const Schedule = require("../models/scheduleTime");

// Helper function for error handling
const handleErrorResponse = (res, error, message) => {
    console.error(error);
    res.status(500).json({ status: message, error: error.message });
};

// Add a new schedule
const addSchedule = (req, res) => {
    const { address, district, dateTime } = req.body;

    if (!address || !district || !dateTime) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const newSchedule = new Schedule({ address, district, dateTime });

    newSchedule
        .save()
        .then((savedSchedule) => {
            res.json({ message: "Schedule Details Added...", scheduleId: savedSchedule._id });
        })
        .catch((err) => handleErrorResponse(res, err, "Failed to add schedule details."));
};

// Get all schedule details
const getAllSchedules = (req, res) => {
    Schedule.find()
        .then((schedule) => {
            res.json(schedule);
        })
        .catch((err) => handleErrorResponse(res, err, "Failed to fetch schedules."));
};

// Update schedule details
const updateSchedule = async (req, res) => {
    let scheduleId = req.params.scheduleId;
    const { address, district, dateTime } = req.body;

    if (!address || !district || !dateTime) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const updateScheduleDetails = { address, district, dateTime };

    try {
        const updated = await Schedule.findByIdAndUpdate(scheduleId, updateScheduleDetails, { new: true });

        if (!updated) {
            return res.status(404).json({ error: "Schedule not found." });
        }

        res.status(200).json({ status: "Schedule Details updated successfully", schedule: updated });
    } catch (err) {
        console.error(err); 
        handleErrorResponse(res, err, "Error updating schedule details");
    }
};

// Delete schedule
const deleteSchedule = async (req, res) => {
    let scheduleId = req.params.scheduleId;

    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
        if (!deletedSchedule) {
            return res.status(404).send({ status: "Schedule details not found" });
        }
        res.status(200).send({ status: "Schedule details deleted" });
    } catch (err) {
        handleErrorResponse(res, err, "Error deleting schedule details");
    }
};

// Confirm schedule
const confirmSchedule = async (req, res) => {
    const { scheduleId } = req.body; // Extracting schedule ID from the request body

    try {
        const schedule = await Schedule.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ status: "Schedule details not found" });
        }
        res.status(200).json({ status: "Schedule confirmed", schedule });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error confirming schedule" });
    }
};

module.exports = {
    addSchedule,
    getAllSchedules,
    updateSchedule,
    deleteSchedule,
    confirmSchedule
};
