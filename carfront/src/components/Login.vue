<template>
  <div>
    <navbar/>
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
              :class="['custom-input', { error: !form.username }]"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              :class="['custom-input', { error: !form.password }]"
              required
            />
          </div>
          <div class="form-group">
            <button type="submit" @click.prevent="submitForm()">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NavBar from "./Navbar.vue"

export default {
  components: {
      navbar: NavBar
    },
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
          .post("http://localhost:8081/users/login", this.form) 
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
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.$toastr.e("Invalid username or password");
            } else {
              this.$toastr.e("An error occurred during login");
            }
          });
      },
    }
};
</script>

<style scoped>
.main-container {
  background-size: cover;
  background-position: center;
  padding: 60px;
  background-image: url('../assets/background.jpg');
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  max-width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 400px;
}

.login-form h2 {
  text-align: center;
}

.login-form .form-group {
  margin-bottom: 20px;
  width: 370px;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.custom-input {
  width: 350px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.error {
  border-color: red;
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
