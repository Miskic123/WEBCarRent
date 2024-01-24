<template>
  <div class="rentObject">
    <navBar></navBar>
    <div class="create-rent-object">
      <h2>Create Rent Object</h2>
      <form @submit.prevent="createRentObject">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="rentObject.name" required>
        </div>

        <div class="form-group">
          <label for="location">Location:</label>
          <input type="text" v-model="rentObject.location.adress" required>
        </div>

        <div class="form-group">
          <label for="workHoursStart">Work Hours Start:</label>
          <input type="text" v-model="rentObject.workHoursStart" required>
        </div>

        <div class="form-group">
          <label for="workHoursEnd">Work Hours End:</label>
          <input type="text" v-model="rentObject.workHoursEnd" required>
        </div>

        <div class="form-group">
          <label for="logo">Select Logo:</label>
          <input type="file" accept="image/*" @change="handleLogoChange">
        </div>

        <div class="form-group">
          <label for="manager">Select Manager:</label>
          <select v-model="rentObject.manager" required>
            <option v-for="manager in freeManagers" :key="manager.id" :value="manager.id">{{ manager.username }}</option>
          </select>

          <router-link v-if="freeManagers.length === 0" to="/createManager">Create Manager</router-link>
        </div>

        <div class="form-group">
          <button type="submit">Create Rent Object</button>
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
      rentObject: {
        name: "",
        vehicles: [],
        location: {
          adress: "",
          latitude: 0,
          longitude: 0,
        },
        workHoursStart: "",
        workHoursEnd: "",
        grade: null,
        imagePath: "",
        manager: "", 
      },
      freeManagers: [],
    };
  },
  methods: {
    createRentObject() {
      axios
      .post("http://localhost:8081/rentObjects", this.rentObject)
      .then((response) => {
        const rentObject = response.data.rentObject1;
        const rentObjectId = rentObject.id;
        console.log(rentObject);
        console.log(rentObjectId)
        this.$toastr.s("Rent Object created successfully!");

        const selectedManager = this.freeManagers.find(manager => manager.id === this.rentObject.manager);
        if (selectedManager) {
          selectedManager.rentalObject = rentObjectId;

          axios
            .put(`http://localhost:8081/users/ManagerUpdate/${selectedManager.id}`, { rentObjectId })
            .then(() => {
              this.$toastr.s("Manager updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating manager:", error);
              this.$toastr.e("An error occurred while updating the manager");
            });
        }
      })
      .catch((error) => {
        console.error("Error creating Rent Object:", error);
        this.$toastr.e("An error occurred while creating the Rent Object");
      });
    } ,

    fetchFreeManagers() {
      axios
        .get("http://localhost:8081/users/freeManagers")
        .then((response) => {
          this.freeManagers = response.data;
          if (this.freeManagers.length === 0) {
          this.$toastr.e("No available managers. Please add managers before creating Rent Objects.");
          }
        })
        .catch((error) => {
          console.error("Error fetching free managers:", error);
        });
        

    },
    handleLogoChange(event) {
      const file = event.target.files[0];

      if (file) {
        const fileName = file.name;
        this.rentObject.imagePath = `/${fileName}`;
        const reader = new FileReader();

        reader.readAsDataURL(file);
      }
    },
  },
  mounted() {
    this.fetchFreeManagers();
    
  },
};
</script>




<style scoped>
.rentObject {
  background-image: url('../assets/background.jpg');
  background-size: cover;
  height: 100vh;
}

.create-rent-object {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  margin-top: 50px;
}

.create-rent-object h2 {
  text-align: center;
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
.create-rent-object input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
