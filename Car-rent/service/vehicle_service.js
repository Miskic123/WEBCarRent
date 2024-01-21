const vehicleRep = require("../repository/vehicle_repository");
const rentObjectRepo = require("../repository/rentObject_repository")
function create(vehicle){	
	 return vehicleRep.create(vehicle);
}
function update(id,updatedVehicle){
	return vehicleRep.update(id,updatedVehicle);
}
function remove(id){
    rentObjectRepo.deleteVehicleFromObject(id);
	return vehicleRep.removeVehicle(id);
}
function getById(id){
	return vehicleRep.getById(id);
}
module.exports = {
	create,update,remove,getById
}