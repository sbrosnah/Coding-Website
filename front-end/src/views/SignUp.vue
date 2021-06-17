<template>
  <div class="page">
    <Home v-if="user" />
    <SignUp v-else />
  </div>
</template>

<script>
import Home from '@/components/Home.vue';
import SignUp from '@/components/SignUp.vue';
import axios from 'axios';
export default {
  name: 'signup',
  components: {
    Home,
    SignUp,
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

<style>

.page {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
