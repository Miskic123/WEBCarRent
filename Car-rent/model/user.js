class User {
	constructor(username,password,name,lastname,gender,dateOfBirth,role,rentalsHistory,basket,rentalObject,points,buyerType){
		this.username= username;
		this.password = password;
		this.name = name;
		this.lastname = lastname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.rentalsHistory = rentalsHistory;
		this.basket = basket;
		this.rentalObject = rentalObject;
		this.points = points;
		this.buyerType = buyerType;
	}

}
module.exports = User;
