const router = require("express").Router();
let WasteDetail = require("../models/WasteDetail");

//Add waste
router.route("/add-waste").post((req,res)=> {
    const category = req.body.category;
    const waste = req.body.waste;
    const weight = Number(req.body.weight);
    const weightType = req.body.weightType;
    const quantity = Number(req.body.quantity);

    const newWaste = new WasteDetail({
        category,
        waste,
        weight,
        weightType,
        quantity
    })

    newWaste.save().then(()=>{
        res.json("Waste Added");
    }).catch((err)=>{
        console.log(err);
    })
})

//view waste
router.route("/view-waste").get((req,res)=>{

    WasteDetail.find().then((wastedetail)=>{
        res.json(wastedetail)
    }).catch((err)=>{
        console.log(err)
    })

})

//update waste detail
router.route("/update-waste/:wasteid").put(async (req, res) => {
    let wasteId = req.params.wasteid; 
    const { category, waste, weight, weightType, quantity } = req.body;

    const updateWastedetail = {
        category,
        waste,
        weight,
        weightType,
        quantity
    };

    await WasteDetail.findByIdAndUpdate(wasteId, updateWastedetail)
        .then(() => {
            res.status(200).send({ status: "Waste Details Updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating waste details", error: err.message });
        });
});

// delete waste detail
router.route("/delete-waste/:wasteid").delete(async(req, res) => {

    let wasteId =req.params.wasteid;

    await WasteDetail.findByIdAndDelete(wasteId)
    .then(() => {
        res.status(200).send({status: "Waste Details Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete waste details", error: err.message});
    })
})

// fetch only one waste
router.route("/get-waste/:wasteid").get(async (req,res) => {

    let wasteId =req.params.wasteid;
    await WasteDetail.findById( wasteId)
    .then((wastedetail) => {
        res.status(200).send({status: "Waste Details Fetched", wastedetail})
        
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get Waste details", error: err.message});
    })
})

module.exports = router;