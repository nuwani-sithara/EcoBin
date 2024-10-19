const CompostRequest = require('../models/CompostRequest');

// Create a new compost request
exports.addCompostRequest = async (req, res) => {
    const { email, potential, amount, cost, address } = req.body;
    try {
        const newRequest = new CompostRequest({
            email,
            potential,
            amount,
            cost,
            address,
            requestDate: new Date(),
            status: 'Pending'
        });

        await newRequest.save();
        res.json('Compost Request Added');
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send({ status: 'Error with adding compost request', error: err.message });
    }
};

// Get all compost requests
exports.getAllCompostRequests = async (req, res) => {
    try {
        const compostRequests = await CompostRequest.find();
        res.json(compostRequests);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with retrieving requests', error: err.message });
    }
};

// Update a compost request
exports.updateCompostRequest = async (req, res) => {
    const requestID = req.params.id;
    const { email, amount, cost, address, status } = req.body;
    const updateRequest = { email, amount, cost, address, status };

    try {
        const updatedRequest = await CompostRequest.findByIdAndUpdate(requestID, updateRequest, { new: true });
        res.status(200).send({ status: 'Request updated', updatedRequest });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data', error: err.message });
    }
};

// User update compost request
exports.updateMyCompostRequest = async (req, res) => {
    const requestID = req.params.id;
    const { amount, potential } = req.body;

    if (amount > potential) {
        return res.status(400).send({ status: 'Error', message: 'Amount exceeds potential' });
    }

    try {
        const updatedRequest = await CompostRequest.findByIdAndUpdate(
            requestID,
            { amount },
            { new: true }
        );
        res.status(200).send({ status: 'Request updated', updatedRequest });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with updating data', error: err.message });
    }
};

// Delete a compost request by ID
exports.deleteCompostRequest = async (req, res) => {
    const requestID = req.params.id;

    try {
        await CompostRequest.findByIdAndDelete(requestID);
        res.status(200).send({ status: 'Request deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with deleting data', error: err.message });
    }
};

// Get compost request by userEmail
exports.getCompostRequestByEmail = async (req, res) => {
    const userEmail = req.params.userEmail;
    try {
        const compostRequest = await CompostRequest.find({ email: userEmail });
        if (!compostRequest) {
            res.status(400).json({ status: 'Request not found' });
        } else {
            res.json(compostRequest);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with retrieving request', error: err.message });
    }
};
