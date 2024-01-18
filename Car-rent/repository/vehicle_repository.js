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

module.exports = {
	create
}