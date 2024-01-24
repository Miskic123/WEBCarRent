<template>
    <div class="buyer-orders">
    <navbar></navbar>
      <div class="sort-options">
            <label>Sort by:</label>
            <select v-model="sortOption" @change="sortOrders" class="options">
              <option value="priceAsc">Price(Low to high)</option>
              <option value="priceDesc">Price(High to low)</option>
              <option value="dateAsc">Date(Low to high)</option>
              <option value="dateDesc">Date(High to low)</option>
            </select>
      </div>
      <div class="orders">
        <div class="order-list">
            <h2>Buyer's Orders</h2>
            <table>
            <thead>
                <tr>
                <th>Rent Object</th>
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
                <td>{{ order.rentalObject}}</td>
                <td>{{ order.date }}</td>
                <td>{{ getOrderVehicles(order.vehicles) }}</td>
                <td>{{ order.duration }} days</td>
                <td>{{ order.price }}</td>
                <td>{{order.orderStatus}}</td>
                <td>
                <button @click="approveOrder(order.id)">Approve</button>
                <button @click="rejectOrder(order.id)">Reject</button>
                <input v-model="order.rejectionReason" placeholder="Rejection Reason" />
                <button @click="submitRejection(order.id, order.rejectionReason)">Submit Rejection</button>
                </td>
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
        selectedOrder: null,  
        sortOption: "nameAsc",
        orderObject:null
      };
    },
    computed:{
      filteredRentObjects() {
      const filteredOrders = this.orders.filter(order => this.matchesSearchQuery(order));
      return this.sortRentObjectsArray(filteredOrders);
    },
    },
    mounted() {
      this.fetchOrders();
    },
    methods: {
      fetchOrders() {
        const userId = localStorage.getItem("userId");
        axios
          .get(`http://localhost:8081/orders/getByManagerId/${userId}`)
          .then((response) => {
            this.orders = response.data;
            this.orderObject = response.data.rentalObject;
            console.log(this.orderObject)
          })
          .catch((error) => {
            console.error("Error fetching buyer's orders:", error);
          });
      },
      getOrderRentObjectName(rentObject) {
        return axios.get(`http://localhost:8081/rentObjects/rentObject/Name/${rentObject}`)
          .then(response => {
            console.log(response.data);
      })
          .catch((error) => {
            console.error(`Error fetching RentObject name for ${this.orderObject}:`, error);
            return 'N/A';
          });
      },
      approveOrder(orderId) {
      axios
        .put(`http://localhost:8081/orders/approveOrder/${orderId}`)
        .then(() => {
          console.log(`Order ${orderId} approved successfully`);
          this.fetchOrders(); 
        })
        .catch((error) => {
          console.error(`Error approving order ${orderId}:`, error);
        });
        },
        rejectOrder(orderId) {
        axios
            .put(`http://localhost:8081/orders/rejectOrder/${orderId}`)
            .then(() => {
            console.log(`Order ${orderId} rejected successfully`);
            this.fetchOrders(); 
            })
            .catch((error) => {
            console.error(`Error rejecting order ${orderId}:`, error);
            });
        },

        submitRejection(orderId, rejectionReason) {
        axios
            .put(`http://localhost:8081/orders/rejectOrder/${orderId}/${rejectionReason}`)
            .then(() => {
            console.log(`Order ${orderId} rejected with reason: ${rejectionReason}`);
            this.fetchOrders(); 
            })
            .catch((error) => {
            console.error(`Error rejecting order ${orderId} with reason: ${rejectionReason}`, error);
            });
        },

      getOrderVehicles(vehicles) {
      return vehicles.map(vehicle => `${vehicle.brand} ${vehicle.model}`).join(', ');
      },
   
      showOrderDetails(order) {
        this.selectedOrder = order;
      },
  
      getImagePath(imagePath) {
        const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
        return require(`@/assets/${normalizedPath}`);
      },
      sortOrdersArray(orders) {
      const sortOption = this.sortOption;
      return orders.sort((a, b) => {
        if (sortOption === "priceAsc") {
          return parseFloat(a.price) - parseFloat(b.price);
        } else if (sortOption === "priceDesc") {
          return parseFloat(b.price) - parseFloat(a.price);
        } else if (sortOption === "dateAsc") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortOption === "dateDesc") {
          return new Date(b.date) - new Date(a.date);
        }
      });
      },

      sortOrders() {
      this.orders = this.sortOrdersArray(this.orders);
      },

    }
  };
  </script>
  
  <style scoped>
  .orders{
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh; 

  
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
  .sort-options{
    font-size: 25px;

  }
  .options{
    size: 25px;
  }
  .vehicle-image{
    width: 300px;
    height: 200px;
    
  }
  .vehicle-details{
    border: 1px solid black;
  }
  
  </style>
  