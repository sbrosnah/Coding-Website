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

              <li class="nav-item active">
                <router-link class="nav-link" to="/chat">Chat</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/myprogress">MyProgress</router-link>
              </li>

            </ul>
            <ul v-if="!user" class="navbar-nav">
              <li  class="nav-item">
                <router-link class="nav-link" to="/">Login</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/signup">Sign Up</router-link>
              </li>
            </ul>
            <ul v-if="user" class="nav navbar-nav ml-auto">
              <li class="nav-item">
                <span class="navbar-text">Logged in as {{user.firstName}} {{user.lastName}} </span>
              </li>
              <li class="nav-item space">
                <button class="btn btn-outline-light my-2 my-sm-0" type="submit" @click.prevent="logout">Logout</button>
              </li>
            </ul>
          </div>
      </nav>
    </div>
    <div class="title-container chat">
      Chat
    </div>
    <router-link class="button" :to="{ name: 'problemdiscussion', params: { id: '1' }}">
      <div class="problem1-button">
        <div class="image-container">
          <div class="text-container">
            <h2>Find Missing Element Discussion</h2>
          </div>
        </div>
      </div>
    </router-link>
    <router-link class="button" :to="{ name: 'problemdiscussion', params: { id: '2' }}">
      <div class="problem2-button">
        <div class="image-container">
          <div class="text-container">
            <h2>Convert Array Discussion</h2>
          </div>
        </div>
      </div>
    </router-link>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Chat',
  methods: {
    async logout() {
    try {
      await axios.delete("/api/users");
      this.$root.$data.user = null;
      } catch (error) {
      this.$root.$data.user = null;
      }
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
}

</script>

<style scoped>

.image-container {
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  margin: 0px 10px;
}

.text-container {
  color: #0;
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
}

.button {
  display: flex;
  width: 80%;
  justify-content: center;
  height: 200px;
  margin: 20px 0px;
}

.problem1-button {
  background-color: #6495ED;
  width: 100%;
  height: 100%;
}
.problem2-button {
  background-color: #F6BE00;
  width: 100%;
  height: 100%;
}

.chat {
  margin-top: 5px;
  background-color: #FF69B4;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

@media only screen and (max-width: 767px) and (min-width: 300px) {
  .title-container {
    font-size: 3em;
  }
  h2 {
    font-size: 2em;
  }
}

</style>
