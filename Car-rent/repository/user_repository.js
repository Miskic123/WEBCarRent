const jsonUtils = require("../json");
const filePath = "./datas/users.json";
const rentObjectRep = require("../repository/rentObject_repository");
const objectsPath = "./datas/rentObjects.json"

function create(user){
	
	const users = jsonUtils.jsonReader(filePath);
	user.id = jsonUtils.generateNextId(users);
	users.push(user);
	jsonUtils.saveDataToFile(users,filePath);
	return user;
}

function update(userId, updatedUser) {
  const users = jsonUtils.jsonReader(filePath);
  const index = users.findIndex((user) => user.id === userId);
  
  users[index] = updatedUser;
  jsonUtils.saveDataToFile(users, filePath);
  return users[index];
  
}

function updateManager(managerId, rentObjectId) {
  const users = jsonUtils.jsonReader(filePath);
  const index = users.findIndex((user) => user.id === managerId);
  console.log(index)
  

  if (index !== -1) {
    const updatedManager = users[index];
    updatedManager.rentalObject = rentObjectId;
    users[index] = updatedManager;

    jsonUtils.saveDataToFile(users, filePath);
    console.log(updatedManager)

    return updatedManager;
  } else {
    return null;
  }
}
function deleteUser(userId) {
  const users = jsonUtils.jsonReader(filePath);
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    jsonUtils.saveDataToFile(users, filePath);
    return deletedUser[0];
  } else {
    return null; 
  }
}

function getById(userId){
	const users = jsonUtils.jsonReader(filePath);
	if (!Array.isArray(users)) {
    console.error("Error: rentObjects is not an array");
    return null; 
    }
    index =  users.findIndex((user) => user.id === parseInt(userId));
	return users[index];
}
function getRentObjectVehicles(userId){
	const user = getById(userId);
	console.log(user.rentalObject);
	const rentObjects = jsonUtils.jsonReader(objectsPath);
    index =  rentObjects.findIndex((rentObject) =>rentObject.id === user.rentalObject);
    const rentObject = rentObjects[index] 
    return rentObject.vehicles;
	
	
}
function getByUsername(userName){
	const users = jsonUtils.jsonReader(filePath);
    index =  users.findIndex((user) => user.username === userName);
	return users[index];
}
function getFreeManagers(){
	const users = jsonUtils.jsonReader(filePath);
	const freeManagers = users.filter((user) => {
    return user.role === "Manager" && user.rentalObject === null;
  	});
  	console.log(freeManagers)
  	return freeManagers
}

module.exports = {
	create,
	deleteUser,
	update,
	getById,
	getByUsername,
	getFreeManagers,
	updateManager,
	getRentObjectVehicles
	
};