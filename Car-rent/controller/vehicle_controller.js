const express = require("express");
const router = express.Router();
const vehicleService = require("../service/vehicle_service")

router.use(express.json());

router.post("/", (req, res) => {
  const vehicle = req.body;
  try {
    vehicleService.create(vehicle);
    res.status(200).json({ message: "Vehicle created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle" });
    console.log(error)
  }
});
router.delete("/delete/:id",(req,res)=>{
	const id = parseInt(req.params.id,10);
	try{
		var vehicle = vehicleService.getById(id);
		if(vehicle){
			vehicleService.remove(id);
			res.status(200).json(vehicle);
		}else{
			res.status(500).json({
				error:"can not find vehicle with that id"
			})
		}
	}
	catch(error){
		"Failed to delete vehicle"
	
	}
})
router.put("/update/:id",(req,res)=>{
	const id = parseInt(req.params.id,10);
	const updatedVehicle = req.body
	try{
		vehicleService.update(id,updatedVehicle);
		res.status(200).json({message:"Vehicle updated successfully"});
		}
	catch(error){
		res.status(500).json({
			error:"Failed to update vehicle"
		})
	}
	
});

module.exports = router;
