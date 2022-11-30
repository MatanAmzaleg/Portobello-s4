import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import portobelloApp from './views/portobello-app.vue'
import boardDetails from './views/board-details.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import taskDetails from './views/task-details.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board',
    name: 'portobello-app',
    component: portobelloApp
  },
  {
    path: '/board/:boardId',
    name: 'board-details',
    component: boardDetails,
    children: [
      {
        path: 'g/:groupId/t/:taskId',
        name: 'task-details',
        component: taskDetails,
      }
    ]
  },
  // {
  //   path: '/board/:id/t/:id',
  //   name: 'task-details',
  //   component: taskDetails
  // },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

