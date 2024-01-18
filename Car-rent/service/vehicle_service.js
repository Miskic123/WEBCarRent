const vehicleRep = require("../repository/vehicle_repository");
const rentObjectRepo = require("../repository/rentObject_repository")
function create(vehicle){	
	 return vehicleRep.create(vehicle);
}

module.exports = {
	create
}