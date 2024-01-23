const orderRep  = require("../repository/order_repository");

function create (order){
	return orderRep.create(order);
}
function remove(orderId){
	return orderRep.removeOrder(orderId);
}
function getById(orderId){
	return orderRep.getById(orderId);
}
function getAll(){
	return orderRep.getAll();
}
function getByUserId(userId){
	return orderRep.getByUserId(userId);
}
function getAllOrdersByManager(managerId){
	return orderRep.getAllOrdersByManager(managerId);
}
module.exports = {
	create,remove,getById,getAll,getByUserId,getAllOrdersByManager
}