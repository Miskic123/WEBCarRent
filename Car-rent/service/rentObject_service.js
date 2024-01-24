const rentObjectRep = require("../repository/rentObject_repository");
const orderService = require("../service/order_service");
const objectDTO = require("../dto/rentObjectDTO");
function getAll(){
	return rentObjectRep.getAll();
}
function create(rentObject){
	return rentObjectRep.create(rentObject);
}
function getById(id){
	return rentObjectRep.getById(id);
}
function update(id,updatedObject){
	return rentObjectRep.update(id,updatedObject);
}
function getRentComments(rentId){
	return rentObjectRep.getAllComments(rentId);
}
function getFreeRentals(startDate, endDate) {
  const rentals = rentObjectRep.getAll();

  const response = rentals
    .map((rental) => {
      const vehicles = orderService.getFilteredVehicles(
        rental,
        startDate,
        endDate
      );

      if (vehicles.length === 0) {
        return null;
      }

      const objectDto = new objectDTO();
      objectDto.id = rental.id;
      objectDto.nameRental = rental.name;
      objectDto.logoR = rental.imagePath;
      objectDto.rentalId = rental.id;
      objectDto.vehicles = vehicles;

      return objectDto;
    })
    .filter((objectDto) => objectDto !== null);

  return response;
}
module.exports = {
	getAll,
	create,
	getById,
	update,
	getFreeRentals,
	getRentComments
};