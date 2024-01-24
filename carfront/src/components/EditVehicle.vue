<template>
    <div class="rentObject">
      <navBar></navBar>
      <div class="create-rent-object">
        <h2>Edit Vehicle</h2>
        <form @submit.prevent="updateVehicle">
          <div class="form-group">
            <label for="brand">Brand:</label>
            <input type="text" v-model="vehicle.vehicle.brand" required>
          </div>
  
          <div class="form-group">
            <label for="model">Model:</label>
            <input type="text" v-model="vehicle.vehicle.model" required>
          </div>
  
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="text" v-model="vehicle.vehicle.price" required>
          </div>
  
          <div class="form-group">
            <label for="vehicleType">Vehicle Type:</label>
            <select v-model="vehicle.vehicle.vehicleType" required>
              <option value="car">Car</option>
              <option value="truck">Truck</option>
              <option value="mobilehome">Mobile Home</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="transType">Transmission Type:</label>
            <select v-model="vehicle.vehicle.transType" required>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="fuelType">Fuel Type:</label>
            <select v-model="vehicle.vehicle.fuelType" required>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="doorsNum">Number of Doors:</label>
            <input type="text" v-model="vehicle.vehicle.doorsNum" required>
          </div>
  
          <div class="form-group">
            <label for="peopleNum">People Capacity:</label>
            <input type="text" v-model="vehicle.vehicle.peopleNum" required>
          </div>
  
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea v-model="vehicle.vehicle.description"></textarea>
          </div>
  
          <div class="form-group">
            <label for="image">Select Image:</label>
            <input type="file"  accept="image/*" @change="handleImageChange">
          </div>
  
          <div class="form-group">
            <button type="submit">Update Vehicle</button>
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
          id: "", 
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

      fetchVehicleData() {
        const vehicleId = this.$route.params.id;
        console.log(vehicleId)
        axios
          .get(`http://localhost:8081/vehicles/${vehicleId}`)
          .then((response) => {
            this.vehicle = response.data;
          })

          .catch((error) => {
            console.error("Error fetching vehicle data:", error);
          });
      },

      updateVehicle() {
        const vehicleId = this.$route.params.id;
        axios
          .put(`http://localhost:8081/vehicles/update/${vehicleId}`, this.vehicle)
          .then(() => {
            this.$toastr.s("Vehicle updated successfully!");
            this.$router.push("/managersVehicles");
          })
          .catch((error) => {
            console.error("Error updating vehicle:", error);
            this.$toastr.e("An error occurred while updating the vehicle");
          });
      },
      handleImageChange(event) {
        const file = event.target.files[0];
  
        if (file) {
          const fileName = file.name;
          this.vehicle.image = `/${fileName}`;
        }
      },
    },
    mounted() {
      this.fetchVehicleData();
      console.log(this.vehicle)
    },
  };
  </script>
  
  <style scoped>
  .create-rent-object {
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  
  .create-rent-object h2 {
    text-align: center;
    font-size: 45px;
    font-weight: bold;
    position: absolute;
    color: white;
    left: 400px;
    bottom: 700px;
  }
  
  .create-rent-object form {
    font-size: 20px;
    padding: 20px;
    line-height: 30px;
    color: aliceblue;
    width: 400px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .create-rent-object select,
  .create-rent-object input,
  .create-rent-object textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  
  .create-rent-object button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: black;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .create-rent-object button:hover {
    background-color: #45a049;
  }
  </style>
  