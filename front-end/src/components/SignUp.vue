<template>
<div class="page">
  <div class="menu">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#"><img src='/images/new-logo.png' width= 50px class="d-inline-block align-center" alt="">CodeSmart</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">

            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/problems">Problems</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/chat">Chat</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/myprogress">MyProgress</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/">Login</router-link>
            </li>

            <li class="nav-item active">
              <router-link class="nav-link" to="/signup">Sign Up</router-link>
            </li>

          </ul>
        </div>
    </nav>
  </div>
  <div class="my-login-box">
    <div class="my-title-container">
      <div class="logo">
        <img src="/images/new-logo.png" width=100px>
      </div>
      <div class="my-name">
        <h1>CodeSmart</h1>
      </div>
    </div>
    <form>
        <input type="text" placeholder="first name" v-model="firstName">
        <input type="text" placeholder="last name" v-model="lastName">

        <input type="text" placeholder="username" v-model="username">
        <input type="text" placeholder="email address" v-model="emailAddress">

        <input type="text" placeholder="password" v-model="password">
        <input type="text" placeholder="confirm password" v-model="confirmedPassword">

    </form>
    <button type="submit" @click.prevent="signUp">Sign Up</button>
    <router-link class="login-link" to="/">Have an account? click here to login</router-link>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignUp',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      comfirmedPassword: '',
      emailAddress: '',
      error: ''
    }
  },
  methods: {
    async signUp() {
      this.error= '';
      if(!this.firstName || !this.lastName || !this.username || !this.password || !this.confirmedPassword || !this.emailAddress)
        return;
      try {
        let response = await axios.post("api/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
          emailAddress: this.emailAddress,
          confirmedPassword: this.confirmedPassword
        });
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.password = '';
        this.confirmedPassword = '';
        this.emailAddress = '';
        this.$root.$data.user = response.data.user;
        this.$root.$data.loginMode = 'signUp';
      }catch(error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
}
</script>

<style scoped>

.my-name {
  display: flex;
  width: 100%;
}

.login-link {
  margin-bottom: 40px;
}

.page {
display: flex;
justify-content: center;
align-items: center;
}

.my-login-box {
font-family: 'Roboto', sans-serif;
display: flex;
border: 1px solid #a9a9a9;
width: 500px;
margin: 70px 0px;
flex-direction: column;
align-items: center;
background-color: #343a40;
box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.my-title-container {
display: flex;
flex-direction: column;
align-items: center;
margin: 50px;
color: #fff;
}

form {
display: flex;
height: 400px;
flex-direction: column;
width: 90%;
align-items: center;
}

input {
margin: 20px 0px;
width: 90%;
height: 20% !important;
}

.error {
margin-top: 10px;
display: inline;
padding: 5px 20px;
border-radius: 30px;
font-size: 10px;
background-color: #d9534f;
color: #fff;
}

button {
margin: 50px;
width: 50%;
border-radius: 4px;
color: #fff;
background-color: #6495ED;
}

button:hover {
box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

</style>
