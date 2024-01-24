<template>
  <div>
    <navbar></navbar>
    <div class="basket">
      <h2>Your Basket</h2>
      <div v-if="basketLoading">Loading...</div>
      <div v-if="basketError">Error loading basket: {{ basketError }}</div>
      <div v-if="basket && !basketLoading && !basketError">
        <div v-if="basket.vehicles.length === 0">
          <p>Your basket is empty.</p>
        </div>
        <ul v-if="basket.vehicles.length > 0">
          <li v-for="vehicle in basket.vehicles" :key="vehicle.id" class="vehicle-item">
            <img :src="getImagePath(vehicle.image)" alt="Vehicle Image" class="vehicle-image">
            <div class="vehicle-details">
              <p><strong>{{ vehicle.brand }} {{ vehicle.model }}</strong></p>
              <p><strong>Price:</strong> {{ vehicle.price }}</p>
            </div>
            <button @click="removeFromBasket(vehicle.id)">Remove</button>
          </li>
        </ul>
        <div class="order-details">
          <p><strong>Start Date:</strong> {{ basket.startDate }}</p>
          <p><strong>End Date:</strong> {{ basket.endDate }}</p>
          <p><strong>Rental Object ID:</strong> {{ basket.rentalId }}</p>
          <p><strong>Total Price:</strong> {{ basket.price }}</p>
          <button @click="placeOrder">Place Order</button>
        </div>
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
      userId: localStorage.getItem('userId'),
      basket: null,
      basketLoading: false,
      basketError: null,
    };
  },
  mounted() {
    this.fetchBasket();
  },
  methods: {
    fetchBasket() {
      if (!this.userId) {
        console.error('User ID not found.');
        return;
      }

      this.basketLoading = true;
      axios
        .get(`http://localhost:8081/baskets/${this.userId}`)
        .then((response) => {
          this.basket = response.data;
        })
        .catch((error) => {
          this.basketError = error.message || 'An error occurred while fetching the basket.';
        })
        .finally(() => {
          this.basketLoading = false;
        });
    },
    getImagePath(imagePath) {
      const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      return require(`@/assets/${normalizedPath}`);
    },
    removeFromBasket(vehicleId) {
      axios
        .delete(`http://localhost:8081/baskets/deleteVehicle/${this.userId}/${vehicleId}`)
        .then(() => {
          this.fetchBasket();
        })
        .catch((error) => {
          console.error('Error removing vehicle from basket:', error);
        });
    },
    placeOrder() {

      const startDate = new Date(this.basket.startDate);
      const endDate = new Date(this.basket.endDate);
      const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

      const totalPrice = this.basket.price; 

      const order = {
        vehicles: this.basket.vehicles,
        rentalObject: this.basket.rentalId,
        date: this.basket.startDate,
        duration: durationInDays,
        price: totalPrice,
        buyer: parseInt(this.userId, 10),
        orderStatus: 'In progress', 
      };

      axios
        .post('http://localhost:8081/orders', order)
        .then(() => {
          window.location.reload();
          console.log('Order placed successfully');

          axios
            .delete(`http://localhost:8081/baskets/${this.basket.id}`)
            .then(() => {
              console.log('Basket cleared after placing order');
              this.fetchBasket(); 
            })
            .catch((clearError) => {
              console.error('Error clearing basket:', clearError);
            });
        })
        .catch((error) => {
          console.error('Error placing order:', error);
        });
    },

  },
};
</script>

<style scoped>
.basket {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.vehicle-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.vehicle-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
}

.vehicle-details {
  flex-grow: 1;
}

.order-details {
  margin-top: 20px;
}

button {
  margin-left: 10px;
}
</style>
