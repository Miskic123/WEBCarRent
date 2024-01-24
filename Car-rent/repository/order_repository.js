const jsonUtils = require("../json");
const orderFile = "./datas/orders.json";
const userFile = "./datas/users.json"
const orders = jsonUtils.jsonReader(orderFile);
const users = jsonUtils.jsonReader(userFile);
const userRep = require("./user_repository");
const objectFile = "./datas/rentObjects.json";
const rentObjects = jsonUtils.jsonReader(objectFile)
const vehiclesFile = "./datas/vehicles.json";
const vehicles = jsonUtils.jsonReader(vehiclesFile);

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
      }
    }

    return false; // Include the vehicle in the result
  });

  return vehicles;
}







module.exports = {
	create, removeOrder,getById,getAll,getByUserId,getAllOrdersByManager,getFreeVehicles
}