<template>
  <div class="rentObject">
    <navBar></navBar>
    <div class="create-rent-object">
      <h2>Create Vehicle</h2>
      <form @submit.prevent="createVehicle">
        <div class="form-group">
          <label for="brand">Brand:</label>
          <input type="text" v-model="vehicle.brand" required>
        </div>

        <div class="form-group">
          <label for="model">Model:</label>
          <input type="text" v-model="vehicle.model" required>
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input type="text" v-model="vehicle.price" required>
        </div>

        <div class="form-group">
          <label for="vehicleType">Vehicle Type:</label>
          <select v-model="vehicle.vehicleType" required>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
            <option value="mobilehome">Mobile Home</option>
          </select>
        </div>

        <div class="form-group">
          <label for="transType">Transmission Type:</label>
          <select v-model="vehicle.transType" required>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <div class="form-group">
          <label for="fuelType">Fuel Type:</label>
          <select v-model="vehicle.fuelType" required>
            <option value="diesel">Diesel</option>
            <option value="petrol">Petrol</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div class="form-group">
          <label for="doorsNum">Number of Doors:</label>
          <input type="text" v-model="vehicle.doorsNum" required>
        </div>

        <div class="form-group">
          <label for="peopleNum">People Capacity:</label>
          <input type="text" v-model="vehicle.peopleNum" required>
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <input v-model="vehicle.description">
        </div>

        <div class="form-group">
          <label for="image">Select Image:</label>
          <input type="file" accept="image/*" @change="handleImageChange">
        </div>

        <div class="form-group">
          <button type="submit">Create Vehicle</button>
        </div>
      </form>
    </div>
  </div>
</template>

  <script>
  import axios from "axios";
  import NavBar from "./Navbar.vue";
  
  export default {
    components: {
      navBar: NavBar,
    },
    data() {
      return {
        vehicle: {
          brand: "",
          model: "",
          price: "",
          vehicleType: "",
          rentalObject: "",
          transType: "",
          fuelType: "",
          doorsNum: "",
          peopleNum: "",
          description: "",
          image: "", 
          status: "Available", 
        },
      };
    },
    methods: {
        createVehicle() {
      const userId = localStorage.getItem("userId");
      axios
        .get(`http://localhost:8081/users/getById/${userId}`)
        .then((response) => {
          const user = response.data;
          this.vehicle.rentalObject = user.rentalObject;
          console.log(this.vehicle.rentalObject)

          axios
            .post("http://localhost:8081/vehicles", this.vehicle)
            .then(() => {
              this.$toastr.s("Vehicle created successfully!");
              this.$router.push("/managersVehicles");
            })
            .catch((error) => {
              console.error("Error creating vehicle:", error);
              this.$toastr.e("An error occurred while creating the vehicle");
            });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
     }   ,
      handleImageChange(event) {
        const file = event.target.files[0];
  
        if (file) {
          const fileName = file.name;
          this.vehicle.image = `/${fileName}`;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .create-rent-object {
    background-image: url('../assets/background.jpg'); 
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .create-rent-object h2{
    position: relative;
    text-align: center;
    bottom: 380px;
    left: 170px;
    font-size: 35px;
  }
  .create-rent-object form{
    font-size: 25px;
    padding: 20px;
    position: relative;
    bottom: 130px;
    right: 70px;
    line-height: 40px;
    color: aliceblue;

  }
  
  
  </style>
  