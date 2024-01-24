const jsonUtils = require("../json");
const basketFile = "./datas/baskets.json"
const baskets = jsonUtils.jsonReader(basketFile);

function findIndex(baskets, id) {
  return baskets.findIndex((basket) => basket.id === parseInt(id));
}

function create(basket) {
  basket.id = jsonUtils.generateNextId(baskets);
  baskets.push(basket);
  jsonUtils.saveDataToFile(baskets, basketFile);
}

function getCartByUserId(userId) {
  for (const basket of baskets) {
    if (basket.user == userId) {
      return basket;
    }
  }
  return null;
}

function update(id, updatedBasket) {

  index = findIndex(baskets, id);

  baskets[index] = updatedBasket;

  baskets[index].id = parseInt(id, 10);

  jsonUtils.saveDataToFile(baskets, basketFile);

  return baskets[index];
}

function remove(id) {
  const index = findIndex(baskets, id);

  if (index !== -1) {
    const removedBasket = baskets.splice(index, 1)[0];
    jsonUtils.saveDataToFile(baskets, basketFile);
    return removedBasket;
  } else {
    throw new Error("Basket not found");
  }
}


function getAll() {
  return jsonUtils.jsonReader(basketFile);
}

function getById(id) {
  index = findIndex(baskets, id);

  return baskets[index];
}
function deleteVehicleFromBasket(basket, vehicleId) {
  basket.vehicles = basket.vehicles.filter(
    (vehicle) => vehicle.id !== vehicleId
  );
  return basket;
}

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  getCartByUserId,
  deleteVehicleFromBasket
};
