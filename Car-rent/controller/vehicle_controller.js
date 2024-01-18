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

module.exports = router;
