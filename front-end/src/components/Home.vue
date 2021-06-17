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

              <li class="nav-item active">
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

            </ul>
            <ul class="nav navbar-nav ml-auto">
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
    <div class="home-title-container">
      <h1 id="first-word">Welcome</h1>
      <h1 id="second-word">To</h1>
      <div class="logo-with-title">
        <img src="/images/new-logo.png" width=170px>
        <div class="home-title">CodeSmart</div>
      </div>
    </div>
    <router-link class="button" to="/problems">
      <div id="problems-button">
        <div class="image-container">
          <img src="/images/problem_solving.png" width=150px>
          <div class="text-container">
            <h2>Solve Problems</h2>
          </div>
        </div>
      </div>
    </router-link>
    <router-link class="button" to="/chat">
      <div id="chat-button">
        <div class="image-container">
          <img src="/images/chat.png" width=150px>
          <div class="text-container">
            <h2>Discuss Problems</h2>
          </div>
        </div>
      </div>
    </router-link>
    <router-link class="button" to="/myprogress">
      <div id="check-progress-button">
        <div class="image-container">
          <img src="/images/progress.png" width=150px>
          <div class="text-container">
            <h2>See Your Progress</h2>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
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
  methods: {
    async logout() {
    try {
      await axios.delete("/api/users");
      this.$root.$data.user = null;
      } catch (error) {
      this.$root.$data.user = null;
      }
    }
  }
}

</script>

<style scoped>


.text-container {
  color: #0;
  display: flex;
  width: 75%;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
}

h2 {
  font-size: 4em;
}

.image-container {
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  margin: 0px 10px;
}

.button {
  display: flex;
  width: 80%;
  justify-content: center;
  height: 200px;
  margin: 20px 0px;
}

#problems-button {
  background-color: #6495ED;
  width: 100%;
  height: 100%;
}
#chat-button {
  background-color: #FF69B4;
  width: 100%;
  height: 100%;
}
#check-progress-button {
  background-color: #F6BE00;
  width: 100%;
  height: 100%;
}
.logo-with-title {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.home-title-container {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#first-word {
  font-size: 7em;
}

#second-word {
  font-size: 3em;
}

.home-title {
  font-size: 8em;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>
