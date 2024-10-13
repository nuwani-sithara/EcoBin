const router = require("express").Router();
let RouteDetail = require("../models/RouteDetail");

//Add waste
router.route("/add-route").post((req,res)=> {
    const date = req.body.date;
    const route = req.body.route;
    const time = req.body.time;

    const newRoute = new RouteDetail({
        date,
        route,
        time
    })

    newRoute.save().then(()=>{
        res.json("Route Added");
    }).catch((err)=>{
        console.log(err);
    })
})

//view waste
router.route("/view-route").get((req,res)=>{

    RouteDetail.find().then((routedetail)=>{
        res.json(routedetail)
    }).catch((err)=>{
        console.log(err)
    })

})

//update waste detail
router.route("/update-route/:routeid").put(async (req,res)=>{

    let routeId =req.params.routeid;
    const{date, route, time} = req.body;

    const updateRoutedetail = {

        date,
        route,
        time

    }

    const update = await RouteDetail.findByIdAndUpdate(routeId, updateRoutedetail)
    .then(() => {
        res.status(200).send({status: "Route Details Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating Route details", error: err.message});
    })
})

// delete waste detail
router.route("/delete-route/:routeid").delete(async(req, res) => {

    let routeId =req.params.routeid;

    await RouteDetail.findByIdAndDelete(routeId)
    .then(() => {
        res.status(200).send({status: "Route Details Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete route details", error: err.message});
    })
})

// fetch only one waste
router.route("/get-route/:routeid").get(async (req,res) => {

    let routeId =req.params.routeid;
    await RouteDetail.findById( routeId)
    .then((routedetail) => {
        res.status(200).send({status: "Route Details Fetched", routedetail})
        
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get route details", error: err.message});
    })
})

module.exports = router;