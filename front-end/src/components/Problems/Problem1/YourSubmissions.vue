<template>
  <div class="AllSubmissions">
    <div v-for="submission in submissions" class="submission" v-bind:key="submission._id">
      <div class="individual-submission">
        <div v-if="editing != submission._id" class="code">
          <p>{{submission.code}}</p>
        </div>
        <textarea v-else v-model="submission.code" class="code edit-code-input"></textarea>
        <div class="user">
          <div class="buttons">
            <button v-if="editing != submission._id" class="edit" @click.prevent="editSubmission(submission)">Edit</button>
            <button v-else class="edit" @click.prevent="completeEdit(submission)">Change</button>
            <button v-if="editing != submission._id" class="edit" @click.prevent="removeSubmission(submission)">Remove</button>
            <button v-else class="edit" @click.prevent="cancelEdit()">Cancel</button>
          </div>
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
  name: 'YourSubmissions',
  data() {
    return {
      problemID: '1',
      submissions: [],
      error: '',
      editing: '',
    }
  },
  created() {
    this.loadSubmissions()
  },
  methods: {
    async loadSubmissions() {
        try{
          let response = await axios.get(`/api/code/users/${this.$root.$data.user._id}/${this.problemID}`);
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
    async completeEdit(submission) {
      try {
        await axios.put(`/api/code/${submission._id}`, {
          code: submission.code
        });
        this.editing = '';
        this.loadSubmissions();
      } catch(error) {
        this.error = error.response.data.message;
      }
    },
    editSubmission(submission) {
      this.editing = submission._id;
    },
    cancelEdit() {
      this.editing = '';
    },
    async removeSubmission(submission) {
      try {
        await axios.delete(`/api/code/${submission._id}`);
        this.loadSubmissions();
      }catch(error) {
        this.error = error.response.data.message;
      }
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
}
</script>

<style scoped>

.edit-code-input {
  display: flex;
  height: 200px;
}


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
