const router = require("express").Router();
let PickupDetail = require("../models/PickupDetail");

//Add pickup
router.route("/add-pickup").post((req,res)=> {
    const name = req.body.name;
    const date = req.body.date;
    const location = req.body.location;
    const phoneNumber = req.body.phoneNumber;

    const newPickup = new PickupDetail({
        name,
        date,
        location,
        phoneNumber
    })

    newPickup.save().then(()=>{
        res.json("Pickup Added");
    }).catch((err)=>{
        console.log(err);
    })
})

//view pickup
router.route("/view-pickup").get((req,res)=>{

    PickupDetail.find().then((pickupdetail)=>{
        res.json(pickupdetail)
    }).catch((err)=>{
        console.log(err)
    })

})

//update pickup detail
router.route("/update-pickup/:pickupid").put(async (req,res)=>{

    let pickupId =req.params.pickupid;
    const{name, date, location, phoneNumber} = req.body;

    const updatePickupdetail = {

        name,
        date,
        location,
        phoneNumber

    }

    const update = await PickupDetail.findByIdAndUpdate(pickupId, updatePickupdetail)
    .then(() => {
        res.status(200).send({status: "Pickup Details Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating pickup details", error: err.message});
    })
})

// delete pickup detail
router.route("/delete-pickup/:pickupid").delete(async(req, res) => {

    let pickupId =req.params.pickupid;

    await PickupDetail.findByIdAndDelete(pickupId)
    .then(() => {
        res.status(200).send({status: "Pickup Details Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete pickup details", error: err.message});
    })
})

// fetch only one pickup
router.route("/get-pickup/:pickupid").get(async (req,res) => {

    let pickupId =req.params.pickupid;

    await PickupDetail.findById( pickupId)
    .then((pickupdetail) => {
        res.status(200).send({status: "Pickup Details Fetched", pickupdetail})
        
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get pickup details", error: err.message});
    })
})

module.exports = router;