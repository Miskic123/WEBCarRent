const express = require("express");
const router = express.Router();
const commentService = require("../service/comment_service")

router.use(express.json());

router.post("/",(req,res)=>{
	const comment = req.body;
	try{
		commentService.create(comment)
		res.status(200).json(comment)
	}catch(error){
		res.status(500).json({error:"Comment failed to create"});
	}
});
router.delete("/deleteComment/:id",(req,res)=>{
	const id = parseInt(req.params.id,10)
	try{
		var comment = commentService.getById(id);
		if(comment){
		commentService.removeComment(id);
		res.status(200).json(comment)
		} 
	}catch(error){
		res.status(500).json({error:"Comment failed to remove"});
	}
})
module.exports = router;