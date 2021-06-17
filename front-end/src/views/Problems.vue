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

              <li class="nav-item active">
                <router-link class="nav-link" to="/problems">Problems</router-link>
              </li>

              <li class="nav-item">
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
    <div class="title-container problems">
      Problems
    </div>
    <div class="page-content">
      <div class="pure-menu pure-menu-scrollable custom-restricted">
        <ul class="pure-menu-list">
            <li class="pure-menu-item">
                <div @click.prevent="setId('1')" class="pure-menu-link">Find Missing Element</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('2')" class="pure-menu-link">Convert Array</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Three</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Four</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Five</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Six</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Seven</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Eight</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Nine</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Ten</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Eleven</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Twelve</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Thirteen</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Fourteen</div>
            </li>
            <li class="pure-menu-item">
                <div @click.prevent="setId('3')" class="pure-menu-link">Problem Fifteen</div>
            </li>

        </ul>
    </div>
    <div v-if="this.showCodeInput == true" class="code-area">
      <textarea class="code-input" placeholder="Enter your code here" v-model="inputCode"></textarea>
      <button type="submit" class="code-button edit" @click="submitCode">Submit</button>
    </div>
      <div v-else class="prompt">Select a Problem</div>
  </div>
    <Problem1 v-if="this.problemID === '1'"/>
    <Problem2 v-if="this.problemID === '2'"/>
    <div v-if="this.problemID === '3'" class="coming-soon">Coming Soon!</div>
  <p class="works-cited">Descriptions and explanations come from Arden Dertat at ardendertat.com</p>
  </div>
</template>

<script>
import axios from 'axios';
import Problem1 from '@/components/Problems/Problem1/Problem1.vue';
import Problem2 from '@/components/Problems/Problem2/Problem2.vue';
export default {
  name: 'Problems',
  components: {
    Problem1,
    Problem2,
  },
  data() {
    return {
      problemID: '',
      showCodeInput: null,
      inputCode: '',
      error: '',
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
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
      this.$root.$data.user = null;
      }
    },
    setId(ID) {
      this.problemID = ID;
      this.showCodeInput = true;
    },
    async submitCode() {
      let myCode = this.inputCode;
      try {
        await axios.post(`/api/code/${this.problemID}`, {
          code: myCode,
          user: this.$root.$data.user,
        });
      }catch(error) {
        this.error = error.response.data.message;
      }
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

.coming-soon {
  font-size: 3em;
}

.code-button {
  width: 30%;
}

.code-area {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.prompt {
  margin: 15px;
  width: 100%;
  background-color: #F0F0F0;
  color: #a9a9a9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  font-family: 'Roboto', sans-serif;
}

.code-input {
  margin: 15px;
  width: 95%;
  height: 450px;
}

.pure-menu-link {
  width: 100%;
  margin: 5px;
  background-color: #a9a9a9;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

.pure-menu-link:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
    .custom-restricted {
        height: 500px;
        width: 300px;
        margin: 10px;
        color: #000;
    }


.problems {
  margin-top: 5px;
  background-color: #6495ED;
}

.works-cited {
  font-family: 'Roboto', sans-serif;
}


</style>
