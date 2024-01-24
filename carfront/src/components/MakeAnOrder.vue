<template>
    <div>
      <navbar></navbar>
      <div class="make-order">
        <h2>Make Order</h2>
        <div class="dates">
          <div class="date1">
            <label for="startDate">Start Date:</label>
            <input type="date" v-model="startDate" :min="getCurrentDate()" required>
          </div>
          <div class="date2">
            <label for="endDate">End Date:</label>
            <input type="date" v-model="endDate" :min="getCurrentDate()" required>

          </div>
          <div v-if="rentalObjects.length === 0">
            <p>No rental objects available for the selected dates.</p>
          </div>
        </div>
  
        <div v-if="rentalObjects.length > 0" class="rentObjectsList">
          <div v-for="rentalObject in rentalObjects" :key="rentalObject.id" class="rentObject">
            <h3>{{ rentalObject.nameRental }}</h3>
            <img :src="getImagePath(rentalObject.logoR)" alt="Rental Object Logo" class="rental-logo">
            <div v-if="rentalObject.vehicles.length === 0">
              <p>No available vehicles for this rental object.</p>
            </div>
            <ul v-if="rentalObject.vehicles.length > 0" class="vehiclesList">
              <li v-for="vehicle in rentalObject.vehicles" :key="vehicle.id" class="vehicles">
                <div class="vehicle-details">
                  <img :src="getImagePath(vehicle.image)" alt="Vehicle Image" class="vehicle-image">
                  <p><strong>{{ vehicle.brand }} {{ vehicle.model }}</strong></p>
                  <p><strong>Price:</strong> {{ vehicle.price }}</p>
                  <p><strong>Type:</strong> {{ vehicle.vehicleType }}</p>
                  <p><strong>Transmition:</strong>{{ vehicle.transType }}</p>
                  <p><strong>Fuel:</strong> {{ vehicle.fuelType }}</p>
                  <p><strong>People capacity:</strong> {{ vehicle.peopleNum }}</p>
                  <button @click="addToBasket(vehicle)">Add to Basket</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
  
        <div class="shopping-cart">
            <router-link to="/basket">
            <img src="@/assets/cart.jpg" alt="Shopping Cart Icon" class="shop">
            </router-link>
            <div class="notification" v-if="notification">{{ notification }}</div>
        </div>
  
        <div>
          <button @click="submitOrder">Submit Order</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import NavBar from '../components/Navbar.vue';

export default {
  components: {
    navbar: NavBar,
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      rentalObjects: [],
      selectedVehicle: null,
      basket: [],
    };
  },
  methods: {
    fetchFreeVehicles() {
      const startTime = this.formatDate(this.startDate);
      const endTime = this.formatDate(this.endDate);

      axios
        .get(`http://localhost:8081/rentObjects/${startTime}/${endTime}`)
        .then((response) => {
          this.rentalObjects = response.data;
        })
        .catch((error) => {
          console.error('Error fetching rental objects:', error);
        });
    },
    formatDate(date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(date) ? date : new Date(date).toISOString().split('T')[0];
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1; 
      let day = today.getDate();
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;

      return `${year}-${month}-${day}`;
    },
    getImagePath(imagePath) {
      const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      return require(`@/assets/${normalizedPath}`);
    },
    addToBasket(vehicle) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error('User ID not found in localStorage.');
        return;
    }

    const basketItem = {
        vehicles: [vehicle],
        user: userId,
        price: vehicle.price,
        startDate: this.startDate,
        endDate: this.endDate,
        rentalId: vehicle.rentalObject, // Assuming rentalObject is the ID of the rental
        id: 0, // Set to 0 or leave it out if it's not applicable at this point
    };

    axios
        .post(`http://localhost:8081/baskets/${userId}`, basketItem)
        .then(() => {
        this.basket.push(vehicle);
        this.$toastr.s(`${vehicle.brand} ${vehicle.model} added to the basket.`);
        })
        .catch((error) => {
        console.error('Error adding vehicle to the basket:', error);
        this.$toastr.e('Error adding vehicle to the basket.');
        });
    },

    viewBasket() {
      console.log('View Basket');
    },
    submitOrder() {
      console.log('Order submitted:', {
        startDate: this.startDate,
        endDate: this.endDate,
        selectedVehicle: this.selectedVehicle,
        basket: this.basket,
      });
    },
  },
  watch: {
    startDate: 'fetchFreeVehicles',
    endDate: 'fetchFreeVehicles',
  },
};
</script>

  
  <style scoped>
  .make-order {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
  }
  
  .rentObjectsList {
    display: flex;
    flex-wrap: wrap;
  }
  
  .rentObject {
    align-items: center;
    text-align: center;
    border: 2px solid black;
    width: 300px;
    margin: 10px;
    padding: 10px;
  }
  
  .vehiclesList {
    list-style-type: none;
    align-items: center;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  
  .vehicles {
    text-align: center;
    margin: 10px 0;
  }
  
  .vehicle-details {
    border: 1px solid black;
    padding: 10px;
  }
  
  .vehicle-image {
    width: 150px;
    height: 100px;
    object-fit: cover;
  }
  
  .rental-logo {
    width: 150px;
    height: 120px;
    object-fit: cover;
  }
  
  .shop {
    position: absolute;
    left:1750px;
    bottom: 760px;
    width:40px;
    height: 40px;
    
  }
  
  .notification {
    position: fixed;
    bottom: 20px;
    right: 80px;
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: inline-block;
    opacity: 0;
    transition: opacity 0.5s;
  }
  
  .notification.show {
    opacity: 1;
  }
  </style>
  