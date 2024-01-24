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
		res.status(500).json({error:"Order failed to create"});
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
		res.status(500).json({error:"Order failed to remove"});
	}
})
router.get("/getAll",(req,res)=>{
	res.json(orderService.getAll());
})
router.get("/getByUserId/:userId",(req,res)=>{
	const userId = parseInt(req.params.userId,10);
	try{
		const orders = orderService.getByUserId(userId);
		res.status(200).json(orders)
	}catch(error){
		res.status(500).json({error:"Failed"})
	}
})
router.get("/getAllOrdersByManagerRentObject/:managerId",(req,res)=>{
	const managerId = parseInt(req.params.managerId,10);
	res.json(orderService.getAllOrdersByManager(managerId));
})
router.get('/freeVehicles', (req, res) => {
  try {
    const { startTime, endTime } = req.query;

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Invalid start or end time parameters.' });
    }

    const freeVehicles = orderService.getFreeVehicles(startDate, endDate);

    res.json({ freeVehicles });
  } catch (error) {
    console.error('Error fetching free vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;