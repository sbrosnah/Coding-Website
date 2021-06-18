<template>
  <div class="page">
    <div class="menu">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#"><img src='/images/new-logo.png' width= 50px class="d-inline-block align-center" alt="">CodeSmart</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="nav navbar-nav">

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

              <li class="nav-item active">
                <router-link class="nav-link" to="/">Login</router-link>
              </li>

              <li class="nav-item">
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
        <input type="text" placeholder="username" v-model="username">
        <input type="text" placeholder="password" v-model="password">
        <button class="submit" type="submit" @click.prevent="login">Login</button>
      </form>
      <p class="my-signup-link">Don't have an account?</p>
      <router-link class="my-signup-link" to="/signup">click here to sign up</router-link>
      <p v-if="error" class="error">{{error}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      this.error = '';
      if (!this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.username,
          password: this.password
        });
        this.$root.$data.user = response.data.user;
      } catch(error) {
        this.error = "Error: " + error.response.data.message;
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

.my-signup-link {
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
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
  height: 10%;
}

.submit {
  margin-top: 150px;
  width: 50%;
  border-radius: 4px;
  color: #fff;
  background-color: #6495ED;
}

button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
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

@media only screen and (max-width: 767px) and (min-width: 300px) {
  .my-login-box {
    width: 300px;
  }
}

</style>
