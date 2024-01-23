const jsonUtils = require("../json");
const orderFile = "./datas/orders.json";
const userFile = "./datas/users.json"
const orders = jsonUtils.jsonReader(orderFile);
const users = jsonUtils.jsonReader(userFile)
const userRep = require("./user_repository");

function create(order){
	order.id = jsonUtils.generateNextId(orders);
	orders.push(order);
	jsonUtils.saveDataToFile(orders,orderFile)
	return order;
	
}
function removeOrder(orderId){
	const index = orders.findIndex((order)=>order.id === orderId)
	if(index !== -1){
		orders.splice(index,1)
		jsonUtils.saveDataToFile(orders,orderFile)
	} else {
		return null;
	}
}

function getById(id){
	const index = orders.findIndex((order)=>order.id === id);
	return orders[index]
}
function getByUserId(userId){
	const usersOrders = orders.filter((order) => {
    return order.buyer === userId
  	});
  	return usersOrders;
}
function getAll(){
	return orders
}
function getAllOrdersByManager(managerId){
	const manager = userRep.getById(managerId);
	const managerOrders = orders.filter((order)=>{
		return order.rentalObject === manager.rentalObject
	})
	return managerOrders
}
module.exports = {
	create, removeOrder,getById,getAll,getByUserId,getAllOrdersByManager
}