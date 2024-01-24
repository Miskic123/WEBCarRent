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
function getFilteredVehicles(rental, startDate, endDate) {
  return orderRep.getFreeVehicles(rental, startDate, endDate);
}
module.exports = {
	create,remove,getById,getAll,getByUserId,getAllOrdersByManager,getFilteredVehicles
}