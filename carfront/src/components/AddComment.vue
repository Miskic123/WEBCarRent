<template>
  <div class="add">
    <navbar></navbar>
      <div class="add-comment">
        <h2>Add Comment</h2>
        <form @submit.prevent="submitComment">
          <div class="form-group">
            <label for="text" class="label1">Comment:</label>
            <textarea v-model="comment.text" required></textarea>
          </div>
    
          <div class="form-group">
            <label for="grade">Grade (1-5):</label>
            <input type="number" v-model="comment.grade" min="1" max="5" required>
          </div>
    
          <div class="form-group">
            <button type="submit">Submit Comment</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import NavBar from "./Navbar.vue"
  
  export default {
    components:{
      navbar : NavBar
    },
    data() {
      return {
        comment: {
          idUser: parseInt(localStorage.getItem("userId"), 10),
          idRental: this.$route.params.orderId, 
          text: "",
          grade: null,
          isApproved: true,
          isSeen: true,
        },
      };
    },
    methods: {
      submitComment() {
        if (!this.comment.idRental) {
          console.error("idRental is not set");
          return;
        }
  
   
        axios
          .post("http://localhost:8081/comments", this.comment)
          .then(() => {
            this.$toastr.s(`Comment submited succesfully`);
          })
          .catch((error) => {
            console.error("Error submitting comment:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .add{
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh; 
  }
  .add-comment {
    text-align: center;
    margin: 20px;
    font-size: 30px;



  }
 
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  textarea,
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    box-sizing: border-box;
  }
  </style>
  