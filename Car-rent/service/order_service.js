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
module.exports = {
	create,remove,getById
}