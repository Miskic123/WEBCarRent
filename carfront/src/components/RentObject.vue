<template>
  <div class="background">
    <navbar></navbar>
    <div class="main-container">
      <div class="user-info">
        <div class="object-details">
          <h2>Rental Object Information</h2>
          <div class="info-group">
            <span class="info-value">{{ objectInfo.name }}</span>
          </div>
          <div class="info-group">
            <img :src="getImagePath(objectInfo.imagePath)" alt="Rental Object Logo" class="object-logo">
          </div> 


          <div class="info-group">
            <span class="info-label">Location:</span>
            <span class="info-value">{{ objectInfo.location.adress }}</span>
          </div>


          <div class="info-group">
            <span class="info-label">Grade:</span>
            <span class="info-value">{{ objectInfo.grade }}</span>
          </div>


          <div class="info-group">
            <span class="info-label">Work Hours:</span>
            <span class="info-value">{{ objectInfo.workHoursStart }} - {{ objectInfo.workHoursEnd }}</span>
          </div>


          <div class="info-group">
            <span class="info-label">Status:</span>
            <span class="info-value">{{ getStatus() }}</span>
          </div>
        </div>

        <div class="vehicle-list">
          <h3>Vehicles List</h3>
          <div class="scroll-list">
            <ul class="vehicles-list">
              <li v-for="vehicle in objectInfo.vehicles" :key="vehicle.id" class="vehicle-item">
                <div class="vehicle-details">
                  <h4>{{ vehicle.brand }} {{ vehicle.model }}</h4>
                  <img :src="getImagePath(vehicle.image)" alt="Vehicle Image" class="vehicle-image">
                  <p><strong>Price:</strong> {{ vehicle.price }}</p>
                  <p><strong>Type:</strong> {{ vehicle.vehicleType }}</p>
                  <p><strong>Transmission:</strong> {{ vehicle.transType }}</p>
                  <p><strong>Fuel Type:</strong> {{ vehicle.fuelType }}</p>
                  <p><strong>Doors:</strong> {{ vehicle.doorsNum }}</p>
                  <p><strong>People Capacity:</strong> {{ vehicle.peopleNum }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";

export default {
  components: {
    navbar: Navbar,
  },
  data() {
    return {
      objectInfo: {},
    };
  },
  mounted() {
    this.fetchObjectInfo();
  },
  methods: {
    fetchObjectInfo() {
      const rentObjectId = this.$route.params.id;
      axios
        .get(`http://localhost:8081/rentObjects/${rentObjectId}`)
        .then((response) => {
          this.objectInfo = response.data;
        })
        .catch((error) => {
          console.error("Error fetching object information:", error);
        });
    },
    getImagePath(imagePath) {
      const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      return require(`@/assets/${normalizedPath}`);
    },
    getStatus() {
      const now = new Date();
      const workHoursStart = this.parseTime(this.objectInfo.workHoursStart);
      const workHoursEnd = this.parseTime(this.objectInfo.workHoursEnd);
      
      return now >= workHoursStart && now <= workHoursEnd ? 'Open' : 'Closed';
    },
    parseTime(timeString) {
      const [hours, minutes] = timeString.split(':').map(Number);
      const now = new Date();
      now.setHours(hours);
      now.setMinutes(minutes);
      now.setSeconds(0);
      return now;
    },
  },
};
</script>


<style scoped>
.main-container {
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: top;
  color: #ffffff;
  padding: 60px;
  text-align: center;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: flex-start;
}

.object-details {
  flex: 1; 
  margin-right: 20px;
  position: relative;
  right: 200px;
  align-items: center;
  top: 40px;
  line-height: 40px;
}



.info-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.info-label {
  font-weight: bold;
  margin-right: 10px;
  width: 120px;
}

.info-value {
  flex: 1; 
}

.vehicle-list {
  flex: 2; 
  position: relative;

  top: 40px;
  min-width: 900px;
}

.vehicle-list h3 {
  text-align: center;
  width: 100%;
}

.scroll-list {
  max-height: 400px;
  width: 100%;
}

.vehicles-list {
  flex: 2; /* 2/3 of the view */
  position: relative;
  right: 150px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  overflow-x: auto;
  max-width: 80%; /* Adjusted maximum width for .vehicles-list */
}

.vehicle-list li {
  margin-bottom: 20px;
  width: calc(25% - 20px);
  flex: 0 0 auto;
  padding: 20px; /* Added padding to create space around each item */

  border-radius: 8px; /* Added border-radius for rounded corners */

  


}

.vehicle-details {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  width: 100%;
}

.vehicle-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.object-logo {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  position: relative;
  left: 130px;
}
</style>