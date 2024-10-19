const RouteDetail = require('../models/RouteDetail');

// Add new route
exports.addRoute = async (req, res) => {
    const { date, route, time } = req.body;

    const newRoute = new RouteDetail({
        date,
        route,
        time
    });

    try {
        await newRoute.save();
        res.status(200).json("Route Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// View all routes
exports.viewRoutes = async (req, res) => {
    try {
        const routes = await RouteDetail.find();
        res.status(200).json(routes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// Update a route
exports.updateRoute = async (req, res) => {
    const routeId = req.params.routeid;
    const { date, route, time } = req.body;

    const updatedRoute = { date, route, time };

    try {
        await RouteDetail.findByIdAndUpdate(routeId, updatedRoute);
        res.status(200).send({ status: "Route Details Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating route details", error: err.message });
    }
};

// Delete a route
exports.deleteRoute = async (req, res) => {
    const routeId = req.params.routeid;

    try {
        await RouteDetail.findByIdAndDelete(routeId);
        res.status(200).send({ status: "Route Details Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting route details", error: err.message });
    }
};

// Fetch a single route
exports.getRoute = async (req, res) => {
    const routeId = req.params.routeid;

    try {
        const routeDetail = await RouteDetail.findById(routeId);
        res.status(200).send({ status: "Route Details Fetched", routeDetail });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching route details", error: err.message });
    }
};
