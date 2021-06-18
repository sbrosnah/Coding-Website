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
                <router-link class="nav-link active" to="/chat">Chat</router-link>
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
    <div v-if="this.submissions.length > 0" class="AllSubmissions">
      <div v-for="submission in submissions" v-bind:key="submission._id">
        <div class="individual-submission">
          <div class="code">
            <p>{{submission.code}}</p>
          </div>
          <div v-for="thecomment in comments.get(submission._id)" class="comments" v-bind:key="thecomment._id">
            <div class="individual-comment">
              <p class="commentText">{{thecomment.text}}</p>
              <div class="commentInfo">
                <p class="commenterName">{{thecomment.user.firstName}} {{thecomment.user.lastName}}</p>
                <p class="commentDate">{{formatDate(thecomment.commentCreated)}}</p>
              </div>
            </div>
          </div>
          <button class="edit" v-if="commenting != submission._id && user" @click.prevent="requestComment(submission)">Comment</button>
          <div class="conditional" v-if="commenting == submission._id && user">
            <textarea class="text" v-model="comment"></textarea>
            <div class="conditional-buttons">
              <button class="edit" @click.prevent="makeComment(submission)">Submit</button>
              <button class="edit" @click.prevent="cancelComment">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="coming-soon">
      <h2>No submissions for this problem yet</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'ProblemDiscussion',
  data() {
    return {
      problemId: this.$route.params.id,
      submissions: [],
      comments: new Map(),
      comment: '',
      commenting: '.',
    }
  },
  async created() {
    this.loadSubmissions();
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
    async loadSubmissions() {
        try{
          let response = await axios.get(`/api/code/${this.problemId}`);
          this.submissions = response.data;
          for(let i = 0; i < this.submissions.length; i++) {
            let commentsArray = await this.getComments(this.submissions[i]);
            this.comments.set(this.submissions[i]._id, commentsArray);
          }
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
    async makeComment(submission) {
      try {
        await axios.post(`/api/comments/${submission._id}`, {
          text: this.comment,
        });
        this.getComments(submission);
      } catch(error){
        this.error = error.response.data.message;
      }
    },
    async getComments(submission){
      try {
        let response = await axios.get(`/api/comments/${submission._id}`);
        return response.data;
      } catch(error) {
        this.error = error.response.data.message;
      }
    },
    requestComment(submission) {
      this.commenting = submission._id;
    },
    cancelComment() {
      this.commenting = '';
    },
  },
  computed: {
    user() {
      return this.$root.$data.user;
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

.comments {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 70%
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

.individual-comment{
  display: flex;
  flex-direction: column;
  width: 100%;

}

.comment-text {
  display: flex;
  width: 100%;
}

.commentInfo {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0px;
  font-size: .8em;
}

.conditional-buttons {
  display: flex;
  flex-direction: row;
}

.text {
  margin: 10px;
  display: flex;
  width: 80%;
}
.conditional {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
}

@media only screen and (max-width: 767px) and (min-width: 300px) {
  h2 {
    font-size: 2em;
  }
}
</style>
