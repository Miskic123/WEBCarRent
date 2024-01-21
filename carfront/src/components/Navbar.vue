<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">Home</router-link>
      <template v-if="isLoggedIn && userRole === 'Administrator'">
        <router-link to="/userinfo" class="navbar-item">UserInfo</router-link>
        <router-link to="/addobject" class="navbar-item">AddObject</router-link>
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
  padding: 0.8rem; 
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
