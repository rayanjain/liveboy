import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Watch from '../views/Watch.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
