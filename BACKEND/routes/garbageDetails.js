const express = require("express");
const router = express.Router();
const garbageDetailsController = require("../controllers/garbageDetailsController");

// Routes
router.post("/addgarbageDetails", garbageDetailsController.addGarbageDetails);
router.get("/allgarbageDetails", garbageDetailsController.getAllGarbageDetails);
router.put("/updategarbageDetails/:garid", garbageDetailsController.updateGarbageDetails);
router.delete("/deletegarbageDetails/:garid", garbageDetailsController.deleteGarbageDetails);
router.get("/getgarbage/:garid", garbageDetailsController.getGarbageById);

module.exports = router;





























// const router = require("express").Router();
// let Garbage = require("../models/garbageDetails");

// // Insert garbageDetails
// router.route("/addgarbageDetails").post((req, res) => {
//     const { name, contactNumber, type, weight, additionalNotes } = req.body;
  
//     console.log("Received Data:", req.body); // To inspect incoming data
  
//     if (!name || !contactNumber || !type || !weight || !additionalNotes) {
//       return res.status(400).json({ error: "All fields are required." });
//     }
  
//     const newGarbage = new Garbage({
//       name,
//       contactNumber: Number(contactNumber),
//       type,
//       weight: Number(weight),
//       additionalNotes,
//     });
  
//     newGarbage
//       .save()
//       .then((savedGarbage) => {
//         res.json({
//           message: "Garbage Details Added...",
//           garbageId: savedGarbage._id, // Send the generated garbageId in the response
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).json({ error: "Failed to add garbage details." });
//       });
//   });

  
// //display  garbageDetails
// router.route("/allgarbageDetails").get((req,res) => {
//     Garbage.find().then((garbage) => {
//         res.json(garbage)
//     }).catch((err) => {
//         console.log(err);
//     })

// })


// // update garbageDetails
// router.route("/updategarbageDetails/:ferid").put(async (req, res) => {
//     let garId = req.params.garid;
//     const { name,contactNumber,type,weight,additionalNotes} = req.body;

//     const updateGarbageDetails = {
//         name ,
//         contactNumber ,
//         type ,
//         weight ,
//         additionalNotes ,
//     };

//     try {
//         const updated = await Garbage.findByIdAndUpdate(garId, updateGarbageDetails, { new: true });
//         res.status(200).json({ status: "Garbage Details updated successfully", garbage: updated });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: "Error updating garbage Details", error: err.message });
//     }
// });



// // Delete Garbage Details
// router.route("/deletegarbageDetails/:garid").delete(async (req, res) => {
//     let garId = req.params.garid;

//     await Garbage.findByIdAndDelete(garId).then(() => {
//         res.status(200).send({ status: "Garbage Details deleted" });
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).send({ status: "Error with delete garbage details", error: err.message });
//     });
// });


// router.route("/getgarbage/:garid").get(async (req, res) => {
//     let garId = req.params.garid;
//     try {
//         const garbage = await Garbage.findById(garId);
//         if (!garbage) return res.status(404).json({ status: "Garbage details not found" });
//         res.status(200).json({ status: "Garbage details fetched", garbage });
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json({ status: "Error fetching garbage details", error: err.message });
//     }
// });

// module.exports = router;


