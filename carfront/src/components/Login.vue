<template>
    <div class="main-container">
      <div class="login-form">
        <h2>Login</h2>
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="form.username"
              class="custom-input"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="custom-input"
              required
            />
          </div>
          <div class="form-group">
            <button type="submit" @click.prevent="submitForm()">Login</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { jwtDecode } from "jwt-decode";

  
  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
      };
    },
    methods: {
      submitForm() {
        console.log(this.form.username, this.form.password);
        axios
          .post("http://localhost:8081/users/login", this.form) // Replace with your login endpoint
          .then(response => {
            const data = response.data;
            const token = data.token;
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            const userRole = decodedToken.role;
            localStorage.setItem("token",token);
            localStorage.setItem("userId",userId);
            localStorage.setItem("userRole",userRole);
            this.$toastr.s("Login successful!");
            this.$router.push("/");
            // Redirect or perform actions after successful login
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.$toastr.e("Invalid username or password");
            } else {
              this.$toastr.e("An error occurred during login");
            }
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    background-color: #45a049;
    background-size: cover;
    background-position: center;
    padding: 60px;
  }
  
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
  
  .login-form h2 {
    text-align: center;
  }
  
  .login-form .form-group {
    margin-bottom: 20px;
  }
  
  .login-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .custom-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .login-form button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: black;
    color: #fff;
    border: none;
  }
  
  .login-form button:hover {
    background-color: #45a049;
    cursor: pointer;
  }
  </style>
  