<template>
  <div class="AllSubmissions">
    <div v-for="submission in submissions" class="submission" v-bind:key="submission._id">
      <div class="individual-submission">
        <div class="code">
          <p>{{submission.code}}</p>
        </div>
        <div class="user">
          <p>Submitted by {{submission.user.firstName}} {{submission.user.lastName}}</p>
          <p>{{formatDate(submission.created)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default{
  name: 'AllSubmissions',
  data() {
    return {
      problemId: '1',
      submissions: [],
      error: '',
    }
  },
  created() {
    this.loadSubmissions()
  },
  methods: {
    async loadSubmissions() {
        try{
          let response = await axios.get(`/api/code/${this.problemId}`);
          this.submissions = response.data;
        }catch(error) {
          this.error = error.response.data.message;
        }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  },
}
</script>

<style scoped>

.AllSubmissions {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.submission {
  display: flex;
  width: 100%;

}

.individual-submission {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
}

.code {
  border: 1px solid #000;
  padding: 20px;
  width: 80%;
  white-space: pre-wrap;
}

.user {
  display: flex;
  width: 80%;
  justify-content: space-between;
}

</style>
