const express = require("express");
const orderService = require("../service/order_service")
const router = express.Router(); 

router.use(express.json());

router.post("/",(req,res)=>{
	const order = req.body;
	try{
		orderService.create(order)
		res.status(200).json(order)
	}catch(error){
		res.status(500).json({error:"Comment failed to create"});
	}
});
router.delete("/deleteOrder/:id",(req,res)=>{
	const id = parseInt(req.params.id,10)
	try{
		var order = order.getById(id);
		if(order){
		orderService.remove(id);
		res.status(200).json(order)
		} 
	}catch(error){
		res.status(500).json({error:"Comment failed to remove"});
	}
})
module.exports = router;