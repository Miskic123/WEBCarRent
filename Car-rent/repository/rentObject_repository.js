const jsonUtils = require("../json");
const filePath = "./datas/rentObjects.json";
const vehiclesPath = "./datas/vehicles.json"

function create(rentObject){
	const rentObjects = jsonUtils.jsonReader(filePath);
	rentObject.id = jsonUtils.generateNextId(rentObjects);
	rentObjects.push(rentObject);
	jsonUtils.saveDataToFile(rentObjects,filePath)
	return rentObject;
	
}

function getAll(){
	const rentObjects = jsonUtils.jsonReader(filePath);
	return rentObjects;
}
function getObjectVehicles(rentObject){
	const rentObjects = jsonUtils.jsonReader(filePath);
	const vehicles = jsonUtils.jsonReader(vehiclesPath);
	
}

function addNewVehicle(vehicle){
	const rentalObjectId = vehicle.rentalObject;
	console.log(rentalObjectId);
	const object = getById(rentalObjectId);
	object.vehicles.push(vehicle);
	update(rentalObjectId,object);
	return object

}

function update(id, updatedObject) {
  const rentObjects = jsonUtils.jsonReader(filePath);
  const index = rentObjects.findIndex((rentObject) => rentObject.id === parseInt(id));
  console.log("Updating Object with ID:", id);
  rentObjects[index] = updatedObject;
  jsonUtils.saveDataToFile(rentObjects, filePath);
  return rentObjects[index];
}

function getById(id){
	const rentObjects = jsonUtils.jsonReader(filePath);
	console.log(rentObjects);
	if (!Array.isArray(rentObjects)) {
    console.error("Error: rentObjects is not an array");
    return null; // or handle the error accordingly
  }
    index = rentObjects.findIndex((rentObject) => rentObject.id === parseInt(id));
	return rentObjects[index];
	
}


function getAllVehiclesByObject(objectId){
	const rentObjects = jsonUtils.jsonReader(filePath);
	const Object = getById(objectId);
	return Object.vehicles
}

module.exports = {
	create,
	getAll,
	getById,
	update,
	addNewVehicle
};