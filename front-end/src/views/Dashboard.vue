<template>
  <div class="dashboard">
    <Home v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    Home,
    Login,
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
  }
}
</script>
