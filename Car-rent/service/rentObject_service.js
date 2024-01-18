const rentObjectRep = require("../repository/rentObject_repository");

function getAll(){
	return rentObjectRep.getAll();
}
function create(rentObject){
	return rentObjectRep.create(rentObject);
}
function getById(id){
	return rentObjectRep.getById(id);
}
function update(id,updatedObject){
	return rentObjectRep.update(id,updatedObject);
}
module.exports = {
	getAll,
	create,
	getById,
	update
};