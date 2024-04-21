import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import store from '@/store/store'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.use(store)

// apiurl from .env
app.config.globalProperties.$apiURL = 'http://localhost:8000/api'

app.mount('#app')
