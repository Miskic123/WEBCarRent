<template>
  <div>
    <Navbar />

    <div class="home-container">
      <h2>Welcome to Our Website!</h2>

      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Search by name, location, or grade">
      </div>

      <div class="sort-options">
        <label>Sort by:</label>
        <select v-model="sortOption" @change="sortRentObjects">
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="locationAsc">Location (A-Z)</option>
          <option value="locationDesc">Location (Z-A)</option>
          <option value="gradeAsc">Grade (Low to High)</option>
          <option value="gradeDesc">Grade (High to Low)</option>
        </select>
      </div>

      <div class="rent-objects-container">
        <div v-for="rentObject in filteredRentObjects" :key="rentObject.id" class="rent-object">
          <img :src="getImagePath(rentObject.imagePath)" alt="Car Image" class="object-logo">
          <div class="object-info">
            <h3>{{ rentObject.name }}</h3>
            <p>{{ rentObject.location.adress }}</p>
            <p>Grade: {{ rentObject.grade }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      rentObjects: [],
      searchQuery: "",
      sortOption: "nameAsc", // Default sorting option
    };
  },
  computed: {
    filteredRentObjects() {
      const filteredObjects = this.rentObjects.filter(rentObject => this.matchesSearchQuery(rentObject));
      return this.sortRentObjectsArray(filteredObjects);
    },
  },
  methods: {
    fetchRentObjects() {
      axios
        .get("http://localhost:8081/rentObjects/AllObjects")
        .then((response) => {
          this.rentObjects = response.data;
        })
        .catch((error) => {
          console.error("Error fetching rent objects:", error);
        });
    },
    getImagePath(imagePath) {
      const normalizedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      return require(`@/assets/${normalizedPath}`);
    },
    matchesSearchQuery(rentObject) {
      const query = this.searchQuery.toLowerCase();
      return (
        rentObject.name.toLowerCase().includes(query) ||
        rentObject.location.adress.toLowerCase().includes(query) ||
        rentObject.grade.toLowerCase().includes(query)
      );
    },
    sortRentObjectsArray(objects) {
      const sortOption = this.sortOption;
      return objects.sort((a, b) => {
        if (sortOption === "nameAsc") {
          return a.name.localeCompare(b.name);
        } else if (sortOption === "nameDesc") {
          return b.name.localeCompare(a.name);
        } else if (sortOption === "locationAsc") {
          return a.location.adress.localeCompare(b.location.adress);
        } else if (sortOption === "locationDesc") {
          return b.location.adress.localeCompare(a.location.adress);
        } else if (sortOption === "gradeAsc") {
          return parseFloat(a.grade) - parseFloat(b.grade);
        } else if (sortOption === "gradeDesc") {
          return parseFloat(b.grade) - parseFloat(a.grade);
        }
      });
    },
    sortRentObjects() {
      this.rentObjects = this.sortRentObjectsArray(this.rentObjects);
    },
  },
  mounted() {
    this.fetchRentObjects();
  },
};
</script>







<style scoped>
.home-container {
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

.search-bar {
  margin-bottom: 20px;
}

.sort-options {
  margin-bottom: 20px;
}

.sort-options label {
  margin-right: 10px;
}

.sort-options select {
  padding: 5px;
}

.home-container h2 {
  font-size: 2rem;
  font-weight: bold;
}

.rent-objects-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.rent-object {
  background-color: rgba(94, 233, 156, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.object-logo {
  width: 100px; /* Adjust as needed */
  height: 100px; /* Adjust as needed */
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
  
}

.object-info h3 {
  margin: 0;
  font-size: 1.5rem;
}

.object-info p {
  margin: 5px 0;
}
</style>
