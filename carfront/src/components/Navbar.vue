<template>
  <nav class="navbar">
    <div class="navbar-item">
      <template v-if="isLoggedIn && userRole === 'Administrator'">
        <router-link to="/" class = "navbar-item">Home</router-link>
        <router-link to="/userinfo" class="navbar-item">UserInfo</router-link>
        <router-link to="/addObject" class="navbar-item">AddObject</router-link>
        <router-link to="/registerManager" class="navbar-item">Register manager</router-link>
      </template>
      <template v-if="isLoggedIn && userRole === 'Buyer'">
        <router-link to="/userinfo" class="navbar-item">UserInfo</router-link>
      </template>
    </div>
    <div class="navbar-end">
      <template v-if="!isLoggedIn">
        <router-link to="/login" class="navbar-item">Login</router-link>
        <router-link to="/register" class="navbar-item">Register</router-link>
      </template>
      <template v-else>
        <a @click="logout" class="navbar-item">Logout</a>
      </template>
    </div>
  </nav>
</template>

<script>
import { isLoggedIn } from '../authService'; 

export default {
  data() {
    return {
      isLoggedIn: isLoggedIn(),
      userRole: localStorage.getItem('userRole') || '', 
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      const currentRoute = this.$router.currentRoute.value;
      if (currentRoute.path !== '/') {
        this.$router.push("/");
      }
    },
  }
};
</script>

<style scoped>
.navbar {
  background-color: rgba(94, 233, 156, 0.8); 
  padding: 0.4rem; 
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center vertically */

}

.navbar-item {
  color: #ffffff;
  margin-right: 1rem;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem; /* Adjust padding for better appearance */
  border-radius: 5px; /* Add some border radius */
  font-size: 20px;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Add a subtle background on hover */
  text-decoration: underline;
}
</style>
