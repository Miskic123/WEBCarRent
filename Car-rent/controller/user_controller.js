const express = require("express");
const router = express.Router();
const userService = require('../service/user_service');
const { getById } = require("../repository/user_repository");
const jwt = require("jsonwebtoken");
const User = require('../model/user')

const secretKey = process.env.SECRET_KEY || 'default_secret_key';
router.use(express.json());

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  var user = await userService.getByUsername(username);

  if (!user ) {
    return res.status(401).json({ error: "Invalid username or password" }); 
    }
  if(user.password!==password ) {
    return res.status(401).json({ error: "Invalid username or password" });
  } else {
	  const token = jwt.sign(
      {id: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + 60 * 60},
      secretKey
    );

    return res.status(200).json({ token });
 
  }
});




router.post("/", (req, res) => {
  const user = req.body;
  if (userService.getByUsername(user.username)) {
    res.status(409).json({ error: "Username already exists!" });
    return;
  }
  try {
    userService.create(user);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});
router.put("/:id",(req,res)=>{
	const userId = req.params.id;
	const updatedData = req.body;
	try{
		var user = userService.getById(userId);
		if(user){
			const updatedUser = userService.update(userId,updatedData);
			res.status(204).json();
			res.json(updatedUser);
		}else{
			res.status(404).json({error:"User not found"});
			}
		}catch(error){
			 res.status(500).json({ error: "Internal server error" }); 
		}
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
   try{
	   var user = userService.getById(id);
	   if(user){
		   userService.deleteUser(id);
		   res.status(204).json({ message: `User with ID ${id} has been successfully deleted` });
		   }
		   else{
			   res.status(404).json({error:"User not found"});
		   }
   }catch(error){
    res.status(500).json({ error: "Internal server error" }); 
   }
});
router.get("getById/:id",(req,res)=>{
	const id = parseInt(req.params.id,10);
	const user = userService.getById(id);
	if(user!=null){
		res.status(200).json(user);
	}else{
		res.status(404).json({error:"User not found"});
	}
});

router.get("/freeManagers", (req,res)=>{
	const freeMaganers = userService.getFreeManagers();
	if(freeMaganers!=null){
		res.status(200).json(freeMaganers)
	}else{
		res.status(404).json({
			error:"Managers not found"
		})
	}
})

module.exports = 
	router;
