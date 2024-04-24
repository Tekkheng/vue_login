import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css' // Ganti dengan tema yang Anda inginkan
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// import 'primevue/components/calendar/calendar.css'

import store from '@/store/index'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.use(store)

// apiurl from .env
app.config.globalProperties.$apiURL = 'http://localhost:8000/api'

app.mount('#app')
