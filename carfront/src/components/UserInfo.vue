<template>
    <div class="background">
      <navbar></navbar>
      <div class="main-container">
        <div class="user-info">
          <h2>User Information</h2>
          <div class="info-group">
          <label>Username:</label>
          <span v-if="!isEditing">{{ userInfo.username }}</span>
          <input v-else v-model="userInfo.username" />
        </div>

        <div class="info-group">
          <label>Password:</label>
          <span v-if="!isEditing">{{ userInfo.password }}</span>
          <input v-else v-model="userInfo.password" />
        </div>

        <div class="info-group">
          <label>Name:</label>
          <span v-if="!isEditing">{{ userInfo.name }}</span>
          <input v-else v-model="userInfo.name" />
        </div>

        <div class="info-group">
          <label>Surname:</label>
          <span v-if="!isEditing">{{ userInfo.surname }}</span>
          <input v-else v-model="userInfo.surname" />
        </div>

        <div class="info-group">
          <label>Role:</label>
          <span v-if="!isEditing">{{ userInfo.role }}</span>
          <input v-else v-model="userInfo.role" />
        </div>

        <div class="info-group">
          <label>Birthday:</label>
          <span v-if="!isEditing">{{ userInfo.birthday }}</span>
          <input v-else v-model="userInfo.birthday" />
        </div>

        <div class="buyerType">
          <div class="info-group">
            <label class="buyer">Buyer type</label>
          </div>

          <div class="info-group">
            <label>Name:</label>
            <span v-if="!isEditing">{{ userInfo.buyerType.name }}</span>
            <input v-else v-model="userInfo.buyerType.name" />
          </div>

          <div class="info-group">
            <label>Discount:</label>
            <span v-if="!isEditing">{{ userInfo.buyerType.discount }}</span>
            <input v-else v-model="userInfo.buyerType.discount" />
          </div>

          <div class="info-group">
            <label>Points:</label>
            <span>{{ userInfo.buyerType.points }}</span>
          </div>
        </div>
        <button class="button" @click="toggleEdit">{{ isEditing ? 'Save' : 'Edit' }} </button>

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
        isEditing:false
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
      toggleEdit() {
      if (this.isEditing) {
        const userId = localStorage.getItem("userId");
        axios
          .put(`http://localhost:8081/users/update/${userId}`, this.userInfo)
          .then(() => {
            console.log("User information updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating user information:", error);
          });
      }

      this.isEditing = !this.isEditing;
      },
    },
  };
  </script>
  
  <style scoped>
  .main-container{
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
  .user-info{
    position: absolute;
    top: 50px;
    align-items: center;
    font-size: 25px;
    line-height: 50px;
    width:500px;
  }
  .user-info label{
    font-weight: bold;
  }
  .buyer{
    font-weight: bold;
  }
  .button{
    border: 3px solid rgb(68, 231, 130);
    width: 150px;
    height: 50px;
    font-size: 30px;
  }
  .buyerType{
    border: 3px solid black;
  }
  

  </style>
  