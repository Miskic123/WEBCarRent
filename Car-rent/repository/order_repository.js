const jsonUtils = require("../json");
const orderFile = "./datas/orders.json";
const orders = jsonUtils.jsonReader(orderFile);
const objectFile = "./datas/rentObjects.json";
const rentObjects = jsonUtils.jsonReader(objectFile)
const vehiclesFile = "./datas/vehicles.json";
const vehicles = jsonUtils.jsonReader(vehiclesFile);
const userFile = "./datas/users.json";
const users = jsonUtils.jsonReader(userFile);
const basketFile = "./datas/baskets.json"
const baskets = jsonUtils.jsonReader(basketFile);
const basketRep = require("./basket_repository")

const userRep = require("./user_repository");

function create(order){
	order.id = jsonUtils.generateNextId(orders);
	orders.push(order);
	jsonUtils.saveDataToFile(orders,orderFile);
	const orderUser = order.buyer;
	console.log("User koji narucuje ima id:",orderUser);
	const index = users.findIndex((user)=>user.id === orderUser)
	const updatedUser = users[index];
	console.log(updatedUser)
	updatedUser.buyerType.points = updatedUser.buyerType.points + (order.price/1000)*133;
	userRep.update(orderUser,updatedUser);
	const indexBasket = baskets.findIndex((basket)=> basket.user === order.buyer);
	console.log(indexBasket);
	const basket = baskets[indexBasket];
	basketRep.remove(basket.id)
	
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
function CancelOrder(orderId){
	const index = orders.findIndex((order)=>order.id === orderId);
	const updatedOrder = orders[index];
	const order = getById(orderId);
	updatedOrder.orderStatus = "Canceled";
	update(orderId,updatedOrder);
	const indexUser = users.findIndex((user)=>user.id === orderId);
	const updatedUser = users[indexUser];
	updatedUser.points = updatedUser.points + (order.price/1000)*133*4;
	userRep.update(order.buyer,updatedUser)
	return order;
	
}

function ApproveOrder(orderId){
	const index = orders.findIndex((order)=>order.id === orderId)
	const updatedOrder = orders[index];
	updatedOrder.orderStatus = "Approved";
	update(orderId,updatedOrder);
	return updatedOrder;	
}
function getManagersOrders(managerId){
	const manager = userRep.getById(managerId);
	const managersOrders = orders.filter((order) => {
    return order.rentalObject == manager.rentalObject ;
  	});
  	return managersOrders;
	
}
function RejectOrder(orderId,rejectionReason){
	const index = orders.findIndex((order)=>order.id === orderId)
	const updatedOrder = orders[index];
	updatedOrder.orderStatus = "Rejected";
	updatedOrder.rejectionReason = rejectionReason;
	update(orderId,updatedOrder);
	return updatedOrder;		
}
function update(id, updatedOrder) {
  const index = orders.findIndex((order) => order.id === id);
  orders[index] = updatedOrder;
  jsonUtils.saveDataToFile(orders, orderFile);
  return orders[index];
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

function formatDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(date)) {
    return date;
  } else {
    return new Date(date).toISOString().split("T")[0];
  }
}

function getFreeVehicles(rental, startDate, endDate) {
  const vehicles = rental.vehicles.filter((vehicle) => {
    const matchingOrders = orders.filter(
      (order) => order.rentalObject === rental.id
    );

    if (matchingOrders.length > 0) {
      for (const order of matchingOrders) {
        const orderStartDate = new Date(order.date);
        const orderEndDate = new Date(
          orderStartDate.getTime() + order.duration * 24 * 60 * 60 * 1000
        );

        const formattedstartODate = formatDate(orderStartDate);
        const formattedendODate = formatDate(orderEndDate);
        const formattedstartDate = formatDate(startDate);
        const formattedendDate = formatDate(endDate);

        if (
          (formattedstartDate < formattedstartODate &&
            formattedendDate < formattedstartODate &&
            formattedendDate > formattedstartDate) ||
          (formattedstartDate > formattedendODate &&
            formattedendDate > formattedendODate &&
            formattedendDate > formattedstartDate)
        ) {
          return true;
        }
        else{
			return false
		}
      }
    }

    return true; 
  });

  return vehicles;
}







module.exports = {
	create, removeOrder,getById,getAll,getByUserId,getAllOrdersByManager,getFreeVehicles,ApproveOrder,RejectOrder,getManagersOrders,CancelOrder,update
}