const jsonUtils = require("../json");
const vehiclesFile = "./datas/vehicles.json";
const ObjectsFile = "./datas/rentObjects.json"
const rentObjectRepo = require("../repository/rentObject_repository")



function create(vehicle){
	const vehicles = jsonUtils.jsonReader(vehiclesFile);
	const rentObjects = jsonUtils.jsonReader(ObjectsFile);
	vehicle.id = jsonUtils.generateNextId(vehicles);
	vehicles.push(vehicle);
	jsonUtils.saveDataToFile(vehicles, vehiclesFile);
	rentObjectRepo.addNewVehicle(vehicle);
	return vehicle;
}
function update(id, updatedVehicle) {
  const vehicles = jsonUtils.jsonReader(vehiclesFile);
  const index = vehicles.findIndex((vehicle) => vehicle.id === parseInt(id));
  console.log("Updating Vehicle with ID:", id);
  vehicles[index] = updatedVehicle;
  jsonUtils.saveDataToFile(vehicles, vehiclesFile);
  return vehicles[index];
}
function removeVehicle(id){
	const vehicles = jsonUtils.jsonReader(vehiclesFile);
	const index = vehicles.findIndex((vehicle)=>vehicle.id === id)
	if(index !== -1){
	   vehicles.splice(index,1)	;
	   jsonUtils.saveDataToFile(vehicles,vehiclesFile) ;
	} else {
		return null;
	}
}
function getById(id){
	const vehicles = jsonUtils.jsonReader(vehiclesFile);
	const index = vehicles.findIndex((vehicle)=>vehicle.id === id)
	return vehicles[index];
}
module.exports = {
	create,update,removeVehicle,getById
}