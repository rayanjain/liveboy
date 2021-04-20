import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.29.145:3000' //'https://liveboy.herokuapp.com'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
