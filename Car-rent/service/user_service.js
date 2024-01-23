const userRepository = require("../repository/user_repository");

function create(user){
	userRepository.create(user);
}
function update(userId,updatedUser){
	userRepository.update(userId,updatedUser);
}
function updateManager(managerId,rentObjectId){
	userRepository.updateManager(managerId,rentObjectId);
}
function deleteUser(userId){
	userRepository.deleteUser(userId);
}
function getById(userId){
	return userRepository.getById(userId);
}
function getByUsername(username){
	return userRepository.getByUsername(username);
}
function getFreeManagers(){
	return userRepository.getFreeManagers();
}
module.exports= {
	create,
	update,
	deleteUser,
	getById,
	getByUsername,
	getFreeManagers,
	updateManager
};