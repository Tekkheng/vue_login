import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// import 'primevue/resources/themes/bootstrap4-light-blue/theme.css' // Ganti dengan tema yang Anda inginkan
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// import 'primevue/components/calendar/calendar.css'

import PrimeVue from 'primevue/config'
import '@/assets/styles.scss'

import './axios'

import DataTable from 'primevue/datatable'
import TableColumn from 'primevue/column'

import ToastService from 'primevue/toastservice'

// import ColumnGroup from 'primevue/columngroup' // optional
// import Row from 'primevue/row'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(PrimeVue)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(ToastService)

// Register PrimeVue components globally
app.component('DataTable', DataTable)
app.component('TableColumn', TableColumn)

// apiurl from .env
// app.config.globalProperties.$apiURL = 'http://localhost:8000/api'

app.mount('#app')
