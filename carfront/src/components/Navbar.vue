<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">Home</router-link>
    </div>
    <div class="navbar-end">
      <router-link to="/login" class="navbar-item">Login</router-link>
      <router-link to="/register" class="navbar-item">Register</router-link>
    </div>
  </nav>
</template>

<script>
//import { isLoggedIn } from "../authService";
//import axios from "axios"
export default {
  data(){
    return{
      isLoggedIn:false
    };
  }

  
}
</script>

<style scoped>
/* Add your custom styles here */
.navbar {
  background-color: #7ed957; /* Light green color */
  padding: 0.8rem; /* Adjusted padding to make it less thick */
  color: #ffffff;
  display: flex;
  justify-content: space-between;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-item {
  color: #ffffff;
  margin-right: 1rem;
  text-decoration: none;
  font-weight: bold;
}

.navbar-item:hover {
  text-decoration: underline;
}
</style>
