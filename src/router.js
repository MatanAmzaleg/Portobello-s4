import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
import portobelloApp from './views/portobello-app.vue'
import boardDetails from './views/board-details.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import dragAndDrop2 from './cmps/drag-and-drop2.vue'

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
    path: '/board/:id',
    name: 'board-details',
    component: boardDetails
  },
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
  {
    path: '/drag&drop2',
    name: 'drag-and-drop2',
    component: dragAndDrop2
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

