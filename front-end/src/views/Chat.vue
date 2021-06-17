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
    <div class="coming-soon">
      <h2>This feature is coming soon!</h2>
    </div>
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

.chat {
  margin-top: 5px;
  background-color: #FF69B4;
}

@media only screen and (max-width: 767px) and (min-width: 300px) {
  .title-container {
    font-size: 3em;
  }
}

</style>
