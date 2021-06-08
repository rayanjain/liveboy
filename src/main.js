import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://liveboy.centralindia.cloudapp.azure.com' //'http://192.168.29.145:3000' //'https://liveboy.herokuapp.com' //http://20.204.68.153

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
