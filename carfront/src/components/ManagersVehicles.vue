<template>
  <div>
    <navbar></navbar>
    <div class="manager-vehicles-container">
      <h2>Manager's Vehicles</h2>
      <router-link to="/addVehicle">
        <button>Add Vehicle</button>
      </router-link>
      <ul>
        <li v-for="vehicle in vehicles" :key="vehicle.id">
          <div class="vehicle-details">
            <h4>{{ vehicle.brand }} {{ vehicle.model }}</h4>
            <img :src="getImagePath(vehicle.image)" alt="Vehicle Image" class="vehicle-image">
            <p><strong>Price:</strong> {{ vehicle.price }}</p>
            <p><strong>Type:</strong> {{ vehicle.vehicleType }}</p>
            <p><strong>Transmission:</strong> {{ vehicle.transType }}</p>
            <p><strong>Fuel Type:</strong> {{ vehicle.fuelType }}</p>
            <p><strong>Doors:</strong> {{ vehicle.doorsNum }}</p>
            <p><strong>People Capacity:</strong> {{ vehicle.peopleNum }}</p>
            <router-link :to="{ name: 'editVehicle', params: { id: vehicle.id } }">Edit</router-link>
            <button @click="confirmDelete(vehicle.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
  import axios from "axios";
  import NavBar from './Navbar.vue'
  
  export default {
    components:{
        navbar:NavBar
    },
    data() {
      return {
        vehicles: [],
      };
    },
    mounted() {
      this.getManagerVehicles();
    },
    methods: {
      getManagerVehicles() {
        const managerId = localStorage.getItem("userId");
        axios
          .get(`http://localhost:8081/users/getRentObjectVehicles/${managerId}`)
          .then((response) => {
            this.vehicles = response.data;
          })
          .catch((error) => {
            console.error("Error fetching manager's vehicles:", error);
          });
      },
      getImagePath(imagePath) {
        const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
        return require(`@/assets/${normalizedPath}`);
      },
      editVehicle(vehicleId) {
        this.$router.push({ name: "editVehicle", params: { id: vehicleId } });
      },
      deleteVehicle(vehicleId) {
        axios
          .delete(`http://localhost:8081/vehicles/delete/${vehicleId}`)
          .then(() => {
            this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== vehicleId);
            this.$toastr.success('Vehicle deleted successfully.');
          })
          .catch((error) => {
            console.error("Error deleting vehicle:", error);
          });
      },
      confirmDelete(vehicleId) {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
          this.deleteVehicle(vehicleId);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .manager-vehicles-container {
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    
    color: #ffffff;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  
  .vehicle-details {
    background-color: rgba(169, 168, 182, 0.2);
    padding: 15px;
    border-radius: 8px;
    text-align: left;
    margin-bottom: 20px;
    min-width: 300px;
    text-align: center;
  }

  
  .vehicle-image {
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  /* Add more styles as needed */
  </style>
  