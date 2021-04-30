import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Watch from '../views/Watch.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import GoLive from '../views/GoLive.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/watch/:id',
    name: 'Watch',
    component: Watch,
    props: true,
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/golive',
    name: 'GoLive',
    component: GoLive,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) next()
      else next('/')
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) next()
      else next('/')
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
