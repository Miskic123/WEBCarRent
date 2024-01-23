<template>
    <div class="buyer-orders">
    <navbar></navbar>
      <div class="orders">
        <div class="order-list">
            <h2>Buyer's Orders</h2>
            <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Vehicles</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
                
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                <td>{{ order.date }}</td>
                <td>{{ getOrderVehicles(order.vehicles) }}</td>
                <td>{{ order.duration }} days</td>
                <td>{{ order.price }}</td>
                <td>{{order.orderStatus}}</td>
                <td>
                    <button @click="showOrderDetails(order)">Details</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    
        <div v-if="selectedOrder" class="order-details">
            <h2>Order Details</h2>
            <p><strong>Date:</strong> {{ selectedOrder.date }}</p>
            <p><strong>Duration:</strong> {{ selectedOrder.duration }} days</p>
            <p><strong>Price:</strong> {{ selectedOrder.price }}</p>
    
            <h3>Vehicle Details</h3>
            <div v-for="vehicle in selectedOrder.vehicles" :key="vehicle.id" class="vehicle-details">
            <h4>{{ vehicle.brand }} {{ vehicle.model }}</h4>
            <img :src="getImagePath(vehicle.image)" alt="Vehicle Image" class="vehicle-image">
            <p><strong>Price:</strong> {{ vehicle.price }}</p>
            <p><strong>Type:</strong> {{ vehicle.vehicleType }}</p>
            <p><strong>Transmission:</strong> {{ vehicle.transType }}</p>
            <p><strong>Fuel Type:</strong> {{ vehicle.fuelType }}</p>
            <p><strong>Doors:</strong> {{ vehicle.doorsNum }}</p>
            <p><strong>People Capacity:</strong> {{ vehicle.peopleNum }}</p>
            </div>
        </div>
      </div>  
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import NavBar from './Navbar.vue';
  
  export default {
    components: {
      navbar: NavBar
    },
    data() {
      return {
        orders: [],  
        selectedOrder: null  
      };
    },
    mounted() {
      this.fetchOrders();
    },
    methods: {
      fetchOrders() {
        const userId = localStorage.getItem("userId");
        axios
          .get(`http://localhost:8081/orders/getByUserId/${userId}`)
          .then((response) => {
            this.orders = response.data;
          })
          .catch((error) => {
            console.error("Error fetching buyer's orders:", error);
          });
      },
      getOrderVehicles(vehicles) {
      return vehicles.map(vehicle => `${vehicle.brand} ${vehicle.model}`).join(', ');
      },
   
      showOrderDetails(order) {
        // Set the selectedOrder when the "Details" button is clicked
        this.selectedOrder = order;
      },
  
      getImagePath(imagePath) {
        const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
        return require(`@/assets/${normalizedPath}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .orders{
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh; /* Set min-height to ensure the background covers the entire screen */

  
  }
  .order-list h2{
    color: aliceblue;
  }
  .order-list table{
    font-size: 30px;
    width: 1200px;
    table-layout: auto;
    text-align: center;
    border: 1px solid black;
    color: aliceblue;
  }
  .order-details{
    color: aliceblue;
    font-size: 30px;
    
  }
  
  .order-list th,td 
  {
  border: 1px solid black;
  overflow: hidden;
}
  .vehicle-image{
    width: 300px;
    height: 200px;
    
  }
  .vehicle-details{
    border: 1px solid black;
  }
  
  </style>
  