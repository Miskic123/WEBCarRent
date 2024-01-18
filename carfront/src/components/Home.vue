<template>
    <div>
      <Navbar />
  
      <div class="home-container">
        <h2>Welcome to Our Website!</h2>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "./Navbar.vue";
  
  export default {
    components: {
      Navbar,
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .home-container {
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
  
  .home-container h2 {
    font-size: 2rem;
    font-weight: bold;
  }
  </style>
  