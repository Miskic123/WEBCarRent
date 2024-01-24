const basketRepo = require("../repository/basket_repository");
const basket = require("../model/basket");
const userService = require("../service/user_service");

function create(basket) {
  basketRepo.create(basket);
}

function remove(id) {
  return basketRepo.remove(id);
}

function getAll() {
  return basketRepo.getAll();
}

function getById(id) {
  return basketRepo.getById(id);
}


function update(id, updatedBasket) {
  return basketRepo.update(id, updatedBasket);
}

function deleteVehicleFromBasket(basket, vehicleId) {
  basket.vehicles = basket.vehicles.filter(
    (vehicle) => vehicle.id !== vehicleId
  );
  return basket;
}

function addToCart(userId, cartData) {
  const userCart = basketRepo.getCartByUserId(userId);
  console.log(userCart);

  if (userCart != null) {
	for(const vehicle in userCart.vehicles){
	if(cartData.rentalId == vehicle.rentalObject && cartData.startDate == userCart.startDate && cartData.endDate == userCart.endDate){
		userCart.vehicles.push(...cartData.vehicles);
    	const priceArray = cartData.price.split(",").map(Number);
    	const totalPrice = priceArray.reduce(
      	(sum, value) => sum + value,
      	parseInt(userCart.price)
    	);
    	userCart.price = totalPrice;
    	basketRepo.update(userCart.id, userCart);
    	return userCart
	}else{
		return ;
	}
	}

  } else {
    return basketRepo.create(cartData);
  }
}
function getCartByUserId(userId){
	return basketRepo.getCartByUserId(userId);
}

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  getCartByUserId,
  addToCart,
  deleteVehicleFromBasket
};
