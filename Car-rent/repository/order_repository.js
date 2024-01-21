const jsonUtils = require("../json");
const orderFile = "./datas/orders.json";
const orders = jsonUtils.jsonReader(orderFile);

function create(order){
	order.id = jsonUtils.generateNextId(orders);
	orders.push(order);
	jsonUtils.saveDataToFile(rentObjects,filePath)
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
module.exports = {
	create, removeOrder,getById
}