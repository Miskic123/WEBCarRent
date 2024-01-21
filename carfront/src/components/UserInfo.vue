<template>
    <div class="background">
      <navbar></navbar>
      <div class="main-container">
        <div class="user-info">
          <h2>User Information</h2>
          <div class="info-group">
            <label>Username:</label>
            <span>{{ userInfo.username }}</span>
          </div>
          <div class="info-group">
            <label>Password:</label>
            <span>{{ userInfo.password }}</span>
          </div>
          <div class="info-group">
            <label>Name:</label>
            <span>{{ userInfo.name }}</span>
          </div>
          <div class="info-group">
            <label>Surname:</label>
            <span>{{ userInfo.surname }}</span>
          </div>
          <div class="info-group">
            <label>Role:</label>
            <span>{{ userInfo.role }}</span>
          </div>
          <div class="info-group">
            <label>Birthday:</label>
            <span>{{ userInfo.birthday }}</span>
          </div>
          <div class="info-group">
            <label>Points:</label>
            <span>{{ userInfo.points }}</span>
          </div>
          <div class="info-group">
            <label>Buyer type:</label>
            <span>{{ userInfo.buyerType }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Navbar from "./Navbar.vue"; // Adjust the path as needed
  
  export default {
    components: {
      navbar: Navbar,
    },
    data() {
      return {
        userInfo: {},
      };
    },
    mounted() {
      this.fetchUserInfo();
    },
    methods: {
      fetchUserInfo() {
        const userId = localStorage.getItem("userId");
        console.log(userId)
        if (!userId) {
          console.error("userId not found in localStorage");
          return;
        }
  
        axios
          .get(`http://localhost:8081/users/getById/${userId}`)
          .then((response) => {
            this.userInfo = response.data;
          })
          .catch((error) => {
            console.error("Error fetching user information:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .main-container{
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: top;
    color: #ffffff; /* Text color on top of the background image */
    padding: 60px;
    text-align: center;
    height: 100vh; /* Set the height to cover the entire viewport */
    margin: 0; /* Remove default margin */
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Align items to the top of the container */
    align-items: center;
  }
  /* Add your custom styles here */
  /* ... */
  </style>
  