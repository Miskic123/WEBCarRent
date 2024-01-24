const express = require("express");
const router = express.Router();
const rentObject = require("../model/rentObject");
const rentObjectService = require("../service/rentObject_service");
const rentObjects = require("../datas/rentObjects.json")


router.use(express.json());

router.post("/", (req, res) => {
  const rentObject = req.body;
  try {
    const rentObject1 = rentObjectService.create(rentObject);
    res.status(200).json({ message: "Object created successfully" ,rentObject1});
  } catch (error) {
    res.status(500).json({ error: "Failed to create object" });
  }
});

router.get("/:startDate/:endDate",(req,res)=>{
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.endDate);
  res.json(rentObjectService.getFreeRentals(startDate,endDate));
})

router.get("/AllObjects",(req,res)=>{
	res.json(rentObjectService.getAll());
});

router.put("/update/:id",(req,res)=>{
	const id = parseInt(req.params.id,10);
	const updatedObject = req.body
	try{
		rentObjectService.update(id,updatedObject);
		res.status(200).json({message:"Object updated successfully"});
		}
	catch(error){
		res.status(500).json({
			error:"Failed to update object"
		})
	}
	
});

router.get("/:id",(req,res)=>{
	const id = parseInt(req.params.id,10)
	const rentObject = rentObjectService.getById(id);
	if(rentObject !=null){
		res.status(200).json(rentObject)
	}else {
		res.status(404).json({error:"Object not found"})
	}
})
router.get("/rentObject/Name/:id",(req,res)=>{
	const id = parseInt(req.params.id,10)
	const rentObject = rentObjectService.getById(id);
	if(rentObject !=null){
		res.status(200).json(rentObject.name)
	}else {
		res.status(404).json({error:"Object not found"})
	}
})

module.exports = router;