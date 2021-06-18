import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import SignUp from '../views/SignUp.vue'
import Problems from '../views/Problems.vue'
import Chat from '../views/Chat.vue'
import MyProgress from '../views/MyProgress.vue'
import ProblemDiscussion from '../views/ProblemDiscussion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/problems',
    name: 'Problems',
    component: Problems
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/myprogress',
    name: 'MyProgress',
    component: MyProgress
  },
  {
    path: '/problemdiscussion/:id',
    name: 'problemdiscussion',
    component: ProblemDiscussion
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
